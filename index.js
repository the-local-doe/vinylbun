let titleElement = document.getElementById("release-title");
let authorElement = document.getElementById("release-by");
let pressElement = document.getElementById("pressing-by");
let dateElement = document.getElementById("release-date");
let commentElement = document.getElementById("comment");
let vinylPresetElement = document.getElementById("vinyl-preset");
let vinylTrackGapElement = document.getElementById("vinyl-track-gap");
let vinylPitchElement = document.getElementById("vinyl-pitch");
let vinylColorElement = document.getElementById("vinyl-color");
let vinylLabelColorElement = document.getElementById("vinyl-label-color");
let recommendedPitchElement = document.getElementById("recommended-pitch");

const canvas = document.getElementById("pressing");
const ctx = canvas.getContext("2d");

let canvasScale = 2;
canvas.width = canvas.clientWidth * canvasScale;
canvas.height = canvas.clientHeight * canvasScale;

let backgroundColor = "#FFFFFF";
let defaultPressing = {
    releaseTitle: "Abbey Road",
    releaseBy: "Album by The Beatles",
    pressingBy: "The Local Doe",
    releaseDate: "26 September 1969",
    comment: "Abbey Road is the eleventh album by The Beatles. You already know what it is. This is the default pressing for PressBo!",
    version: 0,
    units: [{
        type: "phonograph",
        preset: "12” 33rpm",
        vinylColor: "#999999",
        universal: {
            labelColor: "#abdbf4",
            trackGap: 1,
            groovePitch: 95,
        },
        sides: [{
            time: 1493,
            bands: [{
                title: "Come Together",
                writer: "Lennon",
                time: 259
            }, {
                title: "Something",
                writer: "Harrison",
                time: 182
            }, {
                title: "Maxwell's Silver Hammer",
                writer: "McCartney",
                time: 207
            }, {
                title: "Oh! Darling",
                writer: "McCartney",
                time: 207
            }, {
                title: "Octopus's Garden",
                writer: "Starr",
                time: 171
            }, {
                title: "I Want You (She's So Heavy)",
                writer: "Lennon",
                time: 467
            }]
        }, {
            time: 1331,
            bands: [{
                title: "Here Comes The Sun",
                writer: "Harrison",
                time: 185
            }, {
                title: "Because",
                writer: "Lennon",
                time: 165
            }, {
                title: "You Never Give Me Your Money",
                writer: "McCartney",
                time: 243
            }, {
                title: "Sun King",
                writer: "Lennon",
                time: 146
            }, {
                title: "Mean Mr. Mustard",
                writer: "Lennon",
                time: 66
            }, {
                title: "Polythene Pam",
                writer: "Lennon",
                time: 73
            }, {
                title: "She Came In Through The Bathroom Window",
                writer: "McCartney",
                time: 118
            }, {
                title: "Golden Slumbers",
                writer: "McCartney",
                time: 91
            }, {
                title: "Carry That Weight",
                writer: "McCartney",
                time: 96
            }, {
                title: "The End",
                writer: "McCartney",
                time: 125
            }, {
                title: "Her Majesty",
                writer: "McCartney",
                time: 23
            }]
        }]
    }]
};

function updateTracklist(table, tracklist, id_template) {
    table.innerHTML = "";

    for (let i = 0; i < tracklist.length; i++) {
        let track = tracklist[i];
        let newTableRow = document.createElement("tr");

        let trackNumberHeader = document.createElement("th");
        let trackInfoHeader   = document.createElement("th");
        let trackLengthHeader = document.createElement("th");
        let trackDeleteHeader = document.createElement("th");

        trackInfoHeader.style = "display: grid";

        let trackNameDiv   = document.createElement("span");
        let trackWriterDiv = document.createElement("span");

        trackNameDiv.oninput = () => {
            let [, side] = id_template.split("-");
            unit.sides[side].bands[i].title = trackNameDiv.innerText;
            compressPressing();
        };

        trackWriterDiv.oninput = () => {
            let [, side] = id_template.split("-");
            unit.sides[side].bands[i].writer = trackWriterDiv.innerText;
            compressPressing();
        };

        trackNameDiv.contentEditable = "plaintext-only";
        trackWriterDiv.contentEditable = "plaintext-only";
        trackNameDiv.spellcheck = false;
        trackWriterDiv.spellcheck = false;

        trackNameDiv.className = "editable";
        trackWriterDiv.className = "track-artist editable";

        trackNumberHeader.innerText = i + 1;

        let trackLengthTimeSpan = document.createElement("span");

        trackLengthTimeSpan.innerText = `${track.time / 60 | 0}:${(track.time % 60 + "").padStart(2, 0)}`;
        trackLengthTimeSpan.className = "editable";

        trackLengthTimeSpan.onblur = () => {
            // accidentally not holding shift for the semicolon is a honest mistake, that shouldn't be punished
            trackLengthTimeSpan.innerText = trackLengthTimeSpan.innerText.replaceAll(";", ":");

            let [, side] = id_template.split("-");
            let [minutes, seconds] = trackLengthTimeSpan.innerText.split(":");

            minutes = Number(minutes);
            seconds = Number(seconds);

            if (!isNaN(minutes) || !isNaN(seconds)) {
                if (isNaN(seconds)) {
                    seconds = minutes;
                    minutes = 0;
                }

                unit.sides[side].bands[i].time = minutes * 60 + seconds;
            } else {
                minutes = unit.sides[side].bands[i].time / 60 | 0;
                seconds = unit.sides[side].bands[i].time % 60;
            }

            trackLengthTimeSpan.innerText = `${minutes}:${String(seconds).padStart(2, 0)}`;

            updatePressing();
        };

        trackLengthTimeSpan.contentEditable = "plaintext-only";
        trackLengthTimeSpan.spellcheck = false;

        trackDeleteHeader.innerText = "×";
        trackDeleteHeader.id = id_template + i;
        trackDeleteHeader.className = "delete-row";

        trackDeleteHeader.onclick = (e) => {
            if (unit.type == "phonograph") {
                let [, side, track] = e.srcElement.id.split("-");
                unit.sides[side].bands.splice(track, 1);
            }

            updatePressing();
            updateHTML();
        };

        trackNameDiv.innerText = track.title || "Unknown Title";
        trackWriterDiv.innerText = track.writer || "Unknown Writer";

        trackInfoHeader.append(trackNameDiv, trackWriterDiv);
        trackLengthHeader.append(trackLengthTimeSpan);

        newTableRow.append(trackNumberHeader, trackInfoHeader, trackLengthHeader, trackDeleteHeader);
        table.append(newTableRow);
    }
}

let pressing = null;

let zoom = 115;

function updateHTML() {
    titleElement.innerText       = pressing.releaseTitle || "Unknown Album";
    authorElement.innerText      = pressing.releaseBy || "Album by Unkown Artist";
    dateElement.innerText        = pressing.releaseDate || "an unknown date";
    pressElement.innerText       = pressing.pressingBy || "Unknown presser";
    commentElement.value         = pressing.comment || "Hi evan";
    vinylPitchElement.value      = unit.universal.groovePitch || 125;
    vinylColorElement.value      = unit.vinylColor || "#999999";
    vinylPresetElement.value     = unit.preset || "custom";
    vinylTrackGapElement.value   = unit.universal.trackGap || 1;
    vinylLabelColorElement.value = unit.universal.labelColor || "#F07474";

    let sideOneTable = document.getElementById("tracklist-side-one");
    let sideTwoTable = document.getElementById("tracklist-side-two");

    updateTracklist(sideOneTable, unit.sides[0].bands, "vinyl-0-");
    updateTracklist(sideTwoTable, unit.sides[1].bands, "vinyl-1-");

    compressPressing();
}

function updatePressing() {
    // clear canvas
    ctx.reset();

    switch (unit.type) {
        case "phonograph":
            // non-universal = things that are the same on both sides
            let recordSize, holeSize, lowestPitch = Infinity;

            // draw both sides
            for (let sideNumber = 0; sideNumber < 2; sideNumber++) {
                let currentSide = unit.sides[sideNumber];
                currentSide.time = 0;

                // universal = things that can be different on both sides
                if (!unit.universal) unit.universal = {};
                let groovePitch = currentSide.groovePitch || unit.universal.groovePitch;
                let labelColor  = currentSide.labelColor  || unit.universal.labelColor;
                let labelSize   = currentSide.labelSize   || unit.universal.labelSize;
                let bandStart   = currentSide.bandStart   || unit.universal.bandStart;
                let trackGap    = currentSide.trackGap    || unit.universal.trackGap;
                let bandEnd     = currentSide.bandEnd     || unit.universal.bandEnd;
                let rpm         = currentSide.rpm         || unit.universal.rpm;

                // set-up defaults
                switch (unit.preset) {
                    case "12” 33rpm":
                        recordSize = 5.5 + 7/16;
                        holeSize = 7.5;

                        rpm = 33+1/3;
                        labelSize = 99;
                        bandStart = 5.5 + 7/16 - 1/4;
                        bandEnd = 2+3/8;
                        break;
                    case "10” 33rpm":
                        recordSize = 4.5 + 7/16;
                        holeSize = 7.5;

                        rpm = 33+1/3;
                        labelSize = 99;
                        bandStart = 4.5 + 7/16 - 3/16;
                        bandEnd = 2+3/8;
                        break;
                    case "7” 45rpm":
                        recordSize = 3 + 7/16;
                        holeSize = 1.5 * 25.4;

                        rpm = 45;
                        labelSize = 90;
                        bandStart = 3 + 7/16 - 1/8;
                        bandEnd = 2+1/8;
                        break;
                    case "7” 33rpm":
                        recordSize = 3 + 7/16;
                        holeSize = 1.5 * 25.4;

                        rpm = 33;
                        labelSize = 90;
                        bandStart = 3 + 7/16 - 1/8;
                        bandEnd = 2+1/8;
                        break;
                    case "10” 78rpm":
                        recordSize = 4.5 + 7/16;
                        holeSize = 7.5;

                        rpm = 78;
                        labelSize = 85;
                        bandStart = 4.5 + 7/16 - 3/16;
                        bandEnd = 1+7/8;
                        break;
                }

                let offset = (recordSize + 0.1) * [-1, 1][sideNumber];

                // draw the record itself
                ctx.fillStyle = unit.vinylColor;
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(canvas.width / 2 + offset * zoom, canvas.height / 2, recordSize * zoom, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();

                // draw each band of the record
                let lathePosition = bandStart;
                for (let band of currentSide.bands) {
                    let bandWidth = band.time / 60 * rpm * groovePitch / 25400;
                    currentSide.time += band.time;

                    ctx.beginPath();
                    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
                    ctx.arc(canvas.width / 2 + offset * zoom, canvas.height / 2, Math.max(lathePosition * zoom, 0), 0, 2 * Math.PI);
                    ctx.fill();

                    ctx.beginPath();
                    ctx.fillStyle = unit.vinylColor;
                    ctx.arc(canvas.width / 2 + offset * zoom, canvas.height / 2, Math.max((lathePosition - bandWidth) * zoom, 0), 0, 2 * Math.PI);
                    ctx.fill();

                    lathePosition -= bandWidth + trackGap / 25.4;
                }

                // draw end marker of LP
                ctx.beginPath();
                ctx.setLineDash([20, 10]);
                ctx.arc(canvas.width / 2 + offset * zoom, canvas.height / 2, bandEnd * zoom, 0, 2 * Math.PI);
                ctx.stroke();

                // draw label
                ctx.beginPath();
                ctx.setLineDash([]);
                ctx.lineWidth = 5;
                ctx.fillStyle = labelColor;
                ctx.strokeStyle = darken(labelColor, 0.8);
                ctx.arc(canvas.width / 2 + offset * zoom, canvas.height / 2, labelSize * zoom / 25.4 / 2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();

                // draw hole in label (may complicate pressings with no label, that's future me's problem)
                // look into clipping?
                ctx.beginPath();
                ctx.fillStyle = backgroundColor;
                ctx.arc(canvas.width / 2 + offset * zoom, canvas.height / 2, holeSize * zoom / 25.4 / 2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();

                // side pitches
                lowestPitch = Math.min(lowestPitch, (bandStart - bandEnd - trackGap / 25.4 * (currentSide.bands.length - 1)) / (currentSide.time / 60 * rpm) * 25400);
            }

            recommendedPitchElement.innerText = (lowestPitch | 0) + " µm";
            break;
    }

    compressPressing();
}

function compressPressing() {
    window.history.pushState(null, null, `?p=${LZString144.compressToEncodedURIComponent(JSON.stringify(pressing))}`);
}

function loadPressing() {
    let query = LZString144.decompressFromEncodedURIComponent(window.location.search.split("?p=")[1]);
    try {
        pressing = JSON.parse(LZString144.decompressFromEncodedURIComponent(window.location.search.split("?p=")[1]));
        if (pressing == null) pressing = defaultPressing;
    } catch {
        pressing = defaultPressing;
        compressPressing();
    }
}

function darken(color, amount) {
    color = parseInt(color.slice(1), 16);

    let [r, g, b] = [
        (color & 0xFF0000) >> 16,
        (color & 0xFF00) >> 8,
        color & 0xFF
    ].map(x => (x * amount | 0).toString(16).padStart(2, 0));

    return "#" + r + g + b;
}

loadPressing();
let unit = pressing.units[0];
        updatePressing();
        updateHTML();

canvas.onwheel = (e) => {
    zoom -= event.deltaY / 32;
    updatePressing();
};

window.onresize = (e) => {
    // re-do zoom?
    canvas.width = canvas.clientWidth * canvasScale;
    canvas.height = canvas.clientHeight * canvasScale;
    updatePressing();
};

// Fill out HTML
vinylColorElement.oninput = () => {
    unit.vinylColor = vinylColorElement.value;
    updatePressing();
};

vinylLabelColorElement.oninput = () => {
    unit.universal.labelColor = vinylLabelColorElement.value;
    updatePressing();
};

vinylPitchElement.oninput = () => {
    unit.universal.groovePitch = vinylPitchElement.value;
    updatePressing();
};

vinylPresetElement.oninput = () => {
    unit.preset = vinylPresetElement.value;
    updatePressing();
};

vinylTrackGapElement.oninput = () => {
    unit.universal.trackGap = vinylTrackGapElement.value;
    updatePressing();
};

commentElement.oninput = () => {
    pressing.comment = commentElement.value;
    updatePressing();
};

titleElement.onblur = () => {
    pressing.releaseTitle = titleElement.innerText;
    updatePressing();
};

authorElement.onblur = () => {
    pressing.releaseBy = authorElement.innerText;
    updatePressing();
};

pressElement.onblur = () => {
    pressing.pressingBy = pressElement.innerText;
    updatePressing();
};

dateElement.onblur = () => {
    pressing.releaseDate = dateElement.innerText;
    updatePressing();
};

document.getElementById("tracklist-side-one-add-track").onclick = (e) => {
    unit.sides[0].bands.push({
        title: "Snookeroo",
        writer: "John-Taupin",
        time: 209
    });

    updatePressing();
    updateHTML();
}

document.getElementById("tracklist-side-two-add-track").onclick = (e) => {
    unit.sides[1].bands.push({
        title: "Snookeroo",
        writer: "John-Taupin",
        time: 209
    });

    updatePressing();
    updateHTML();
}

