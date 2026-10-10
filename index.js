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
let vinylSideOneLengthElement = document.getElementById("tracklist-side-one-length");
let vinylSideTwoLengthElement = document.getElementById("tracklist-side-two-length");
let recommendedPitchElement = document.getElementById("recommended-pitch");
let unitsListElement = document.getElementById("units-list");
let addUnitElement = document.getElementById("add-unit");
let pressingHealthElement = document.getElementById("pressing-health");
let pressingSoundsLikeElement = document.getElementById("pressing-sounds-like");
let vinylVariablesElement = document.getElementById("vinyl-variables");
let vinylGrooveColorsElement = document.getElementById("vinyl-groove-colors");
let vinylMaxSideTimeElement = document.getElementById("vinyl-max-side-time");
let vinylSideOneLeftoverElement = document.getElementById("vinyl-side-one-leftover");
let vinylSideTwoLeftoverElement = document.getElementById("vinyl-side-two-leftover");
let vinylHasNoLabelsElement = document.getElementById("vinyl-has-no-labels");
let vinylSideOneDeleteAllElement = document.getElementById("vinyl-side-one-delete-all");
let vinylSideTwoDeleteAllElement = document.getElementById("vinyl-side-two-delete-all");

let vinylRecordSizeElement  = document.getElementById("vinyl-record-size");
let vinylHoleSizeElement    = document.getElementById("vinyl-hole-size");
let vinylRpmElement         = document.getElementById("vinyl-rpm");
let vinylBandStartElement   = document.getElementById("vinyl-band-start");
let vinylBandEndElement     = document.getElementById("vinyl-band-end");
let vinylLabelSizeElement   = document.getElementById("vinyl-label-size");
let vinylInsideStartElement = document.getElementById("vinyl-inside-start");
let vinylFormatNameElement  = document.getElementById("vinyl-format-name");

const canvas = document.getElementById("pressing");
const ctx = canvas.getContext("2d");

for (let clickable of document.getElementsByClassName("vinyl-collapse-table")) {
    let tbody = clickable.offsetParent.querySelector('tbody');
    clickable.onclick = () => {
        tbody.hidden = !tbody.hidden;
        clickable.innerHTML = tbody.hidden ? ">" : "v";
    }
}

let canvasScale = 2;
canvas.width = canvas.clientWidth * canvasScale;
canvas.height = canvas.clientHeight * canvasScale;

let backgroundColor = "#FFFFFF";
let defaultPressing = {
    "releaseTitle": "Abbey Road",
    "releaseBy": "Album by The Beatles",
    "pressingBy": "The Local Doe",
    "releaseDate": "26 September 1969",
    "comment": "Abbey Road is the eleventh album by The Beatles. You already know what it is. This is the default pressing for PressBo!",
    "version": 1,
    "units": [{
        "name": "Abbey Road (2019 Remix)",
        "type": "phonograph",
        "preset": "12” 33rpm",
        "vinylColor": "#999999",
        "universal": {
            "labelColor": "#abdbf4",
            "trackGap": 1,
            "groovePitch": 97,
            "hasLabel": true
        },
        "sides": [{
                "bands": [{
                        "title": "Come Together",
                        "writer": "Lennon",
                        "time": 259
                    },
                    {
                        "title": "Something",
                        "writer": "Harrison",
                        "time": 182
                    },
                    {
                        "title": "Maxwell's Silver Hammer",
                        "writer": "McCartney",
                        "time": 207
                    },
                    {
                        "title": "Oh! Darling",
                        "writer": "McCartney",
                        "time": 207
                    },
                    {
                        "title": "Octopus's Garden",
                        "writer": "Starr",
                        "time": 171
                    },
                    {
                        "title": "I Want You\n(She's So Heavy)",
                        "writer": "Lennon",
                        "time": 467
                    }
                ]
            },
            {
                "bands": [{
                        "title": "Here Comes The Sun",
                        "writer": "Harrison",
                        "time": 185
                    },
                    {
                        "title": "Because",
                        "writer": "Lennon",
                        "time": 165
                    },
                    {
                        "title": "You Never Give Me Your Money",
                        "writer": "McCartney",
                        "time": 243
                    },
                    {
                        "title": "Sun King",
                        "writer": "Lennon",
                        "time": 146
                    },
                    {
                        "title": "Mean Mr. Mustard",
                        "writer": "Lennon",
                        "time": 66
                    },
                    {
                        "title": "Polythene Pam",
                        "writer": "Lennon",
                        "time": 73
                    },
                    {
                        "title": "She Came In Through The Bathroom Window",
                        "writer": "McCartney",
                        "time": 118
                    },
                    {
                        "title": "Golden Slumbers",
                        "writer": "McCartney",
                        "time": 91
                    },
                    {
                        "title": "Carry That Weight",
                        "writer": "McCartney",
                        "time": 96
                    },
                    {
                        "title": "The End",
                        "writer": "McCartney",
                        "time": 125
                    },
                    {
                        "title": "Her Majesty",
                        "writer": "McCartney",
                        "time": 23
                    }
                ]
            }
        ]
    }]
}

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

        trackNumberHeader.innerText = i + 1 + ".";

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

            let tempTime = minutes * 60 + seconds;
            trackLengthTimeSpan.innerText = `${tempTime / 60 | 0}:${String(tempTime % 60).padStart(2, 0)}`;

            updateUnitTables();
            renderUnit();
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

            updateUnitTables();
            renderUnit();
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

function updateHTML() {
    titleElement.innerText           = pressing.releaseTitle || "Unknown Album";
    authorElement.innerText          = pressing.releaseBy || "Album by Unkown Artist";
    dateElement.innerText            = pressing.releaseDate || "an unknown date";
    pressElement.innerText           = pressing.pressingBy || "Unknown presser";
    commentElement.value             = pressing.comment || "Hi evan";
    vinylPitchElement.innerText      = unit.universal.groovePitch || 125;
    vinylColorElement.innerText      = unit.vinylColor || "#999999";
    vinylPresetElement.value         = unit.preset || "12” 33rpm";
    vinylTrackGapElement.innerText   = unit.universal.trackGap == undefined ? 1 : unit.universal.trackGap;
    vinylHasNoLabelsElement.checked  = unit.universal.hasNoLabel == undefined ? false : unit.universal.hasNoLabel;
    vinylLabelColorElement.innerText = unit.universal.labelColor || "#F07474";

    vinylRecordSizeElement.innerText = unit.recordSize;
    vinylHoleSizeElement.innerText   = unit.holeSize;
    vinylRpmElement.innerText        = unit.universal.rpm;
    vinylBandStartElement.innerText  = unit.universal.bandStart;
    vinylBandEndElement.innerText    = unit.universal.bandEnd;
    vinylLabelSizeElement.innerText  = unit.universal.labelSize;
    vinylInsideStartElement.checked  = unit.universal.insideStart;
    vinylFormatNameElement.innerText = unit.formatName || "Name yr format d^∇^”)/";

    let sideOneTable = document.getElementById("tracklist-side-one");
    let sideTwoTable = document.getElementById("tracklist-side-two");

    updateTracklist(sideOneTable, unit.sides[0].bands, "vinyl-0-");
    updateTracklist(sideTwoTable, unit.sides[1].bands, "vinyl-1-");

    compressPressing();
}

function vinylPresetValues() {
    let recordSize, holeSize, rpm, bandStart, bandEnd, labelSize, insideStart;

    switch (unit.preset) {
        // standard
        case "12” 33rpm":
            recordSize = 11.875;
            holeSize = 0.286;

            rpm = "33+1/3";

            bandStart = 11.5;
            bandEnd = 4.75;

            labelSize = 99;
            insideStart = false;
            break;
        case "12” 45rpm":
            recordSize = 11.875;
            holeSize = 0.286;

            rpm = "45";

            bandStart = 11.5;
            bandEnd = 4.75;

            labelSize = 99;
            insideStart = false;
            break;
        case "10” 33rpm":
            recordSize = 9.875;
            holeSize = 0.286;

            rpm = "33+1/3";

            bandStart = 9.5;
            bandEnd = 4.75;

            labelSize = 99;
            insideStart = false;
            break;
        case "7” 33rpm":
            recordSize = 6.875;
            holeSize = 0.286;

            rpm = "33+1/3";

            bandStart = 6.625;
            bandEnd = 4.25;

            labelSize = 90;
            insideStart = false;
            break;
        case "7” 45rpm":
            recordSize = 6.875;
            holeSize = 1.504;

            rpm = "45";

            bandStart = 6.625;
            bandEnd = 4.25;

            labelSize = 90;
            insideStart = false;
            break;
        case "12” 78rpm":
            recordSize = 11.875;
            holeSize = 0.286;

            rpm = "3600 / 46";

            bandStart = 11.5;
            bandEnd = 3.75;

            labelSize = 75;
            insideStart = false;
            break;
        case "10” 78rpm":
            recordSize = 9.875;
            holeSize = 0.286;

            rpm = "3600 / 46";

            bandStart = 9.5;
            bandEnd = 3.75;

            labelSize = 75;
            insideStart = false;
            break;
        // non-standard
        case "10” 45rpm":
            recordSize = 9.875;
            holeSize = 0.286;

            rpm = "45";

            bandStart = 9.5;
            bandEnd = 4.75;

            labelSize = 99;
            insideStart = false;
            break;
        case "trimicron":
            recordSize = 11.875;
            holeSize = 0.286;

            rpm = "33+1/3";

            bandStart = 11.5;
            bandEnd = 4.25;

            labelSize = 90;
            insideStart = false;
            break;
        case "seeburg":
            recordSize = 8.875;
            holeSize = 2;

            rpm = "16+2/3";

            bandStart = 8.5;
            bandEnd = 4.75;

            labelSize = 99;
            insideStart = false;
            break;
        case "16” 33rpm":
            recordSize = 15.9375;
            holeSize = 0.286;

            rpm = "33+1/3";

            bandStart = 15.5;
            bandEnd = 7.5;

            labelSize = 99;
            insideStart = false;
            break;
        case "16” 33rpm is":
            recordSize = 15.9375;
            holeSize = 0.286;

            rpm = "33+1/3";

            bandStart = 15.5625;
            bandEnd = 7.5;

            labelSize = 99;
            insideStart = true;
            break;
        case "gigaton":
            recordSize = 27.875;
            holeSize = 0.286;

            rpm = "33+1/3";

            bandStart = 27.5;
            bandEnd = 4.75;

            labelSize = 99;
            insideStart = false;
            break;
        case "custom":
            recordSize = unit.recordSize;
            holeSize = unit.holeSize;

            rpm = unit.universal.rpm;

            bandStart = unit.universal.bandStart;
            bandEnd = unit.universal.bandEnd;

            labelSize = unit.universal.labelSize;
            insideStart = unit.universal.insideStart;
            break;
    }

    return {
        recordSize:  recordSize,
        holeSize:    holeSize,
        rpm:         rpm,
        bandStart:   bandStart,
        bandEnd:     bandEnd,
        labelSize:   labelSize,
        insideStart: insideStart
    }
}

function renderUnit() {
    // clear canvas
    ctx.reset();

    switch (unit.type) {
        case "phonograph":
            // non-universal = things that are the same on both sides
            let recordSize, holeSize;
            let lowestPitch = Infinity;

            if (unit.preset == "custom") vinylVariablesElement.className = "tracklist-body";
            else vinylVariablesElement.className = "tracklist-body collapse-all-but-first";

            // draw both sides
            for (let sideNumber = 0; sideNumber < 2; sideNumber++) {
                let currentSide = unit.sides[sideNumber];
                let currentTime = 0;

                // variables controlled by the user
                let groovePitch = unit.universal.groovePitch;
                let labelColor  = unit.universal.labelColor;
                let trackGap    = unit.universal.trackGap;
                let hasNoLabel  = unit.universal.hasNoLabel;

                // variables controlled by the preset
                let recordPresetValues = vinylPresetValues();

                recordSize  = recordPresetValues.recordSize;
                holeSize    = recordPresetValues.holeSize;
                rpm         = recordPresetValues.rpm;
                bandStart   = recordPresetValues.bandStart;
                bandEnd     = recordPresetValues.bandEnd;
                labelSize   = recordPresetValues.labelSize;
                insideStart = recordPresetValues.insideStart;

                if (rpm.includes("/") && rpm.includes("+")) {
                    let [whole, fraction] = rpm.split("+");
                    let [numerator, denominator] = fraction.split("/");

                    // who let this be valid javascript!! \(“°Δ°)7
                    // i demand to be taken to their leader!!!
                    rpm = +whole + +numerator / +denominator;
                } else if (rpm.includes("/")) {
                    let [numerator, denominator] = rpm.split("/");
                    rpm = +numerator / +denominator;
                } else rpm = +rpm;

                // at some point, people will want to use this on mobile
                // optimal format is Side One on top and Side Two on the bottom
                // in the future, offsetY will be used in lieu of offsetX on mobile
                let offsetX = (recordSize / 2 + 0.1) * [-1, 1][sideNumber];
                let offsetY = 0;

                // draw the record itself
                ctx.fillStyle = unit.vinylColor;
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(canvas.width / 2 + offsetX * zoom, canvas.height / 2 + offsetY * zoom, Math.max(recordSize / 2 * zoom, 0), 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();

                // set-up start position for drawing
                let latheStartPosition, bandList = currentSide.bands;
                if (!insideStart) latheStartPosition = bandStart / 2;
                else {
                    // js canvas doesn't have layers, so in order to draw an inside-start record
                    // i effectively have to draw the album backwards, starting from the end
                    bandList = [...currentSide.bands].reverse();
                    sideSize = (bandList.length - 1) * trackGap / 25.4;

                    for (let band of bandList) sideSize += band.time / 60 * rpm * groovePitch / 25400;

                    latheStartPosition = bandEnd / 2 + sideSize;
                }

                let lathePosition = latheStartPosition;

                let bandColors = ["#c25c5c", "#c28f5c", "#c2c25c", "#5cc25c", "#5cc2c2", "#5c8fc2", "#5c5cc2", "#8f5cc2", "#c25cc2"];

                // draw each band of the record
                for (let i = 0; i < bandList.length; i++) {
                    let band = bandList[i];
                    let bandWidth = band.time / 60 * rpm * groovePitch / 25400;
                    currentTime += band.time;

                    let bandColor = bandColors[(insideStart ? bandList.length - 1 - i : i) % bandColors.length];

                    ctx.beginPath();
                    ctx.fillStyle = vinylGrooveColorsElement.checked ? bandColor : "rgba(0, 0, 0, 0.4)";
                    ctx.arc(canvas.width / 2 + offsetX * zoom, canvas.height / 2 + offsetY * zoom, Math.max(lathePosition * zoom, 0), 0, 2 * Math.PI);
                    ctx.fill();

                    ctx.beginPath();
                    ctx.fillStyle = unit.vinylColor;
                    ctx.arc(canvas.width / 2 + offsetX * zoom, canvas.height / 2 + offsetY * zoom, Math.max((lathePosition - bandWidth) * zoom, 0), 0, 2 * Math.PI);
                    ctx.fill();

                    lathePosition -= bandWidth + trackGap / 25.4;
                }

                // draw start marker of LP
                if (insideStart || bandList.length == 0) {
                    ctx.beginPath();
                    ctx.setLineDash([20, 10]);
                    ctx.arc(canvas.width / 2 + offsetX * zoom, canvas.height / 2 + offsetY * zoom, Math.max(bandStart * zoom / 2, 0), 0, 2 * Math.PI);
                    ctx.stroke();
                }

                // draw end marker of LP
                if (!insideStart || bandList.length == 0) {
                    ctx.beginPath();
                    ctx.setLineDash([20, 10]);
                    ctx.arc(canvas.width / 2 + offsetX * zoom, canvas.height / 2 + offsetY * zoom, Math.max(bandEnd * zoom / 2, 0), 0, 2 * Math.PI);
                    ctx.stroke();
                }

                ctx.setLineDash([]);

                // draw label
                if (!hasNoLabel) {
                    ctx.beginPath();
                    ctx.lineWidth = 5;
                    ctx.fillStyle = labelColor;
                    ctx.strokeStyle = darken(labelColor, 0.8);
                    ctx.arc(canvas.width / 2 + offsetX * zoom, canvas.height / 2 + offsetY * zoom, Math.max(labelSize * zoom / 25.4 / 2, 0), 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                }

                // draw hole in label (may complicate pressings with no label, that's future me's problem)
                ctx.beginPath();
                ctx.fillStyle = backgroundColor;
                ctx.arc(canvas.width / 2 + offsetX * zoom, canvas.height / 2 + offsetY * zoom, Math.max(holeSize * zoom / 2, 0), 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();

                // remove white hole in the middle
                ctx.save();
                ctx.globalCompositeOperation = 'destination-out';
                ctx.beginPath();
                ctx.arc(canvas.width / 2 + offsetX * zoom, canvas.height / 2 + offsetY * zoom, Math.max(holeSize * zoom / 2 - ctx.lineWidth / 2, 0), 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();

                // side pitches
                lowestPitch = Math.min(lowestPitch, (bandStart / 2 - bandEnd / 2 - trackGap / 25.4 * (currentSide.bands.length - 1)) / (currentTime / 60 * rpm) * 25400);

                let sideMinutes = currentTime / 60 | 0;
                let sideSeconds = (currentTime % 60 + "").padStart(2, 0);

                let currentTimeElement;

                if (sideNumber == 0) {
                    vinylSideOneLengthElement.innerText = `${sideMinutes}:${sideSeconds}`;
                    currentTimeElement = vinylSideOneLeftoverElement;
                    console.log(bandStart / 2, bandEnd / 2, latheStartPosition + trackGap / 25.4)
                } else {
                    vinylSideTwoLengthElement.innerText = `${sideMinutes}:${sideSeconds}`;
                    currentTimeElement = vinylSideTwoLeftoverElement;
                }

                let deadTime, deadTimeNoGap, overTime;

                // incredible! i have no clue how this works, but it does so im not complaining
                if (insideStart) {
                    deadTime      = (bandStart / 2 - latheStartPosition - trackGap / 25.4) / (groovePitch * rpm) * 25400 * 60;
                    deadTimeNoGap = (bandStart / 2 - latheStartPosition) / (groovePitch * rpm) * 25400 * 60;
                    overTime      = (latheStartPosition - bandStart / 2) / (groovePitch * rpm) * 25400 * 60 + 1;
                } else {
                    deadTime      = (lathePosition - bandEnd / 2) / (groovePitch * rpm) * 25400 * 60;
                    deadTimeNoGap = (lathePosition - bandEnd / 2 + trackGap / 25.4) / (groovePitch * rpm) * 25400 * 60;
                    overTime      = (bandEnd / 2 - lathePosition - trackGap / 25.4) / (groovePitch * rpm) * 25400 * 60 + 1;
                }

                if (bandList.length == 0) {
                    currentTimeElement.innerText = `Dead time: ${formatTime(deadTime)}\nAdd a song with the + button :D`;
                } else if (deadTimeNoGap < 1 && deadTimeNoGap > 0) {
                    currentTimeElement.innerText = `Side is full! Yummy! \\(^∇^)/`;
                } else if (deadTime < 0 && deadTimeNoGap > 0) {
                    currentTimeElement.innerText = `Dead time: ${formatTime(deadTimeNoGap)}\nNew song can't be added!`;
                } else if (deadTime < 0 && deadTimeNoGap < 0) {
                    currentTimeElement.innerText = `Over time: ${formatTime(overTime)}\nSide can't be played! Reduce time or pitch!! (”°~°)`;
                } else currentTimeElement.innerText = `Dead time w/ new song: ${formatTime(deadTime)}\nDead time no new song: ${formatTime(deadTimeNoGap)}`;
                vinylMaxSideTimeElement.innerText = formatTime((bandStart / 2 - bandEnd / 2) / (groovePitch * rpm) * 25400 * 60);
            }

            recommendedPitchElement.innerText = lowestPitch | 0;
            break;
    }

    compressPressing();
}

function formatTime(x) {
    let minutes = x / 60 | 0;
    let seconds = x % 60 | 0;
    return `${minutes}:${("" + seconds).padStart(2, 0)}`;
}

function compressPressing() {
    window.history.pushState(null, null, `?p=${LZString144.compressToEncodedURIComponent(JSON.stringify(pressing))}`);
}

function loadPressing() {
    let query = LZString144.decompressFromEncodedURIComponent(window.location.search.split("?p=")[1]);
    try {
        pressing = JSON.parse(LZString144.decompressFromEncodedURIComponent(window.location.search.split("?p=")[1]));
        if (pressing == null) pressing = defaultPressing;

        // updates from version 0:
        //     all previous standards recalculated
        if (pressing.version == 0) {
            for (let unit of pressing.units) {
                switch (unit.preset) {
                    case "12” 33rpm":
                        unit.formatName = "12” 33RPM (version 0)";
                        unit.recordSize = (5.5 + 7/16) * 2;
                        unit.holeSize = 7.5 / 25.4;

                        unit.universal.rpm = "33+1/3";
                        unit.universal.labelSize = 99;
                        unit.universal.bandStart = (5.5 + 7/16 - 1/4) * 2;
                        unit.universal.bandEnd = (2+3/8) * 2;
                        break;
                    case "12” 45rpm":
                        unit.formatName = "12” 45RPM (version 0)";
                        unit.recordSize = (5.5 + 7/16) * 2;
                        unit.holeSize = 7.5 / 25.4;

                        unit.universal.rpm = "45";
                        unit.universal.labelSize = 99;
                        unit.universal.bandStart = (5.5 + 7/16 - 1/4) * 2;
                        unit.universal.bandEnd = (2+3/8) * 2;
                        break;
                    case "10” 33rpm":
                        unit.formatName = "10” 33RPM (version 0)";
                        unit.recordSize = (4.5 + 7/16) * 2;
                        unit.holeSize = 7.5 / 25.4;

                        unit.universal.rpm = "33+1/3";
                        unit.universal.labelSize = 99;
                        unit.universal.bandStart = (4.5 + 7/16 - 3/16) * 2;
                        unit.universal.bandEnd = (2+3/8) * 2;
                        break;
                    case "7” 45rpm":
                        unit.formatName = "7” 45RPM (version 0)";
                        unit.recordSize = (3 + 7/16) * 2;
                        unit.holeSize = 1.5;

                        unit.universal.rpm = "45";
                        unit.universal.labelSize = 90;
                        unit.universal.bandStart = (3 + 7/16 - 1/8) * 2;
                        unit.universal.bandEnd = (2+1/8) * 2;
                        break;
                    case "7” 33rpm":
                        unit.formatName = "7” 33RPM (version 0)";
                        unit.recordSize = (3 + 7/16) * 2;
                        unit.holeSize = 1.5;

                        unit.universal.rpm = "33";
                        unit.universal.labelSize = 90;
                        unit.universal.bandStart = (3 + 7/16 - 1/8) * 2;
                        unit.universal.bandEnd = (2+1/8) * 2;
                        break;
                    case "10” 78rpm":
                        unit.formatName = "10” 78RPM (version 0)";
                        unit.recordSize = (4.5 + 7/16) * 2;
                        unit.holeSize = 7.5 / 25.4;

                        unit.universal.rpm = "78";
                        unit.universal.labelSize = 85;
                        unit.universal.bandStart = (4.5 + 7/16 - 3/16) * 2;
                        unit.universal.bandEnd = (1+7/8) * 2;
                        break;
                    case "trimicron":
                        unit.formatName = "33ᐪ Triple Durée (version 0)";
                        unit.recordSize = (5.5 + 7/16) * 2;
                        unit.holeSize = 7.5 / 25.4;

                        unit.universal.rpm = "33+1/3";
                        unit.universal.labelSize = 99;
                        unit.universal.bandStart = (5.5 + 7/16 - 1/4) * 2;
                        unit.universal.bandEnd = (2.15) * 2;
                        break;
                }

                unit.preset = "custom";
            }

            pressing.version = 1;
        }
    } catch (e) {
        console.log(e);
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

function updateUnitTables() {
    unitsListElement.innerHTML = "";

    for (let i = 0; i < pressing.units.length; i++) {
        let unitObject = pressing.units[i];

        let unitRow = document.createElement("tr");
        if (currentUnit == i) unitRow.className = "current-unit";

        let unitEdit = document.createElement("th");
        unitEdit.className = "edit-unit";
        unitEdit.innerText = "✎";
        unitEdit.onclick = () => setUnit(i);

        let unitName = document.createElement("th");
        if (!unitObject.name) unitObject.name = "name ur unit. lol";
        unitName.innerText = unitObject.name;
        unitName.contentEditable = "plaintext-only";
        unitName.className = "editable";
        unitName.spellcheck = false;
        unitName.oninput = () => {
            unitObject.name = unitName.innerText;
            compressPressing();
        };

        let unitTime = document.createElement("th");

        switch (unitObject.type) {
            case "phonograph":
                let sideOneLength = sideTwoLength = 0;
                for (let band of unitObject.sides[0].bands) sideOneLength += band.time;
                for (let band of unitObject.sides[1].bands) sideTwoLength += band.time;
                let fullVinylTime = sideOneLength + sideTwoLength;
                unitTime.innerText = `${fullVinylTime / 60 | 0}:${("" + fullVinylTime % 60).padStart(2, 0)}`;
                break;
        }

        let unitDelete = document.createElement("th");
        unitDelete.className = "delete-row";
        unitDelete.innerText = "×";
        if (pressing.units.length > 1) {
            unitDelete.onclick = () => {
                pressing.units.splice(i, 1);
                if (currentUnit > i || currentUnit == pressing.units.length) currentUnit--;
                setUnit(Math.min(currentUnit, pressing.units.length - 1));
            }
        } else unitDelete.style = "cursor: not-allowed;";

        unitRow.append(unitEdit, unitName, unitTime, unitDelete);
        unitsListElement.append(unitRow);
    }
}

function setZoomBasedOnSize() {
    zoom = 128 * 11.875 / vinylPresetValues().recordSize;
}

canvas.onwheel = (e) => {
    let zoomFactor = 1.05;
    if (Math.sign(event.deltaY) == -1)  zoom *= zoomFactor;
    if (Math.sign(event.deltaY) == 1)   zoom /= zoomFactor;
    if (zoom < 0) zoom = Number.EPSILON;
    renderUnit();
};

window.onresize = (e) => {
    // re-do zoom?
    canvas.width = canvas.clientWidth * canvasScale;
    canvas.height = canvas.clientHeight * canvasScale;
    renderUnit();
};

// Fill out HTML
vinylPresetElement.oninput = () => {
    let lastPresetValues = vinylPresetValues();

    if (vinylPresetElement.value == "custom") {
        unit.formatName            = "Name yr format d^∇^”)/";
        unit.recordSize            = lastPresetValues.recordSize;
        unit.holeSize              = lastPresetValues.holeSize;
        unit.universal.rpm         = lastPresetValues.rpm;
        unit.universal.bandStart   = lastPresetValues.bandStart;
        unit.universal.bandEnd     = lastPresetValues.bandEnd;
        unit.universal.labelSize   = lastPresetValues.labelSize;
        unit.universal.insideStart = lastPresetValues.insideStart;
    } else {
        delete unit.formatName;
        delete unit.recordSize;
        delete unit.holeSize;
        delete unit.universal.rpm;
        delete unit.universal.bandStart;
        delete unit.universal.bandEnd;
        delete unit.universal.labelSize;
        delete unit.universal.insideStart;
    }

    unit.preset = vinylPresetElement.value;
    renderUnit();
    updateHTML();
};

function updateVinylPitchDescription() {
    pressingHealthElement.innerText = "";
    pressingSoundsLikeElement.innerText = "";

    if (unit.universal.groovePitch == 1) {
        pressingHealthElement.innerText = "but why";
        pressingSoundsLikeElement.href = "https://www.youtube.com/watch?v=3pdZU7iYjxc";
        pressingSoundsLikeElement.innerText = "absolute dogshit. sounds like the screams of the damned.";
    } else if (unit.universal.groovePitch == 11037) {
        pressingHealthElement.innerText = "IM LEON AND I LIKE BALLS";
        pressingSoundsLikeElement.href = "https://www.youtube.com/watch?v=KVcptglGlEY";
        pressingSoundsLikeElement.innerText = "you touched your balls";
    } else if (unit.universal.groovePitch == 2009) {
        pressingHealthElement.innerText = "Very panned sound quality";
        pressingSoundsLikeElement.href = "https://www.youtube.com/watch?v=bztiAcsATyI";
        pressingSoundsLikeElement.innerText = "they fucked up tbh";
    } else if (unit.universal.groovePitch == 347) {
        pressingHealthElement.innerText = "Incredible sound quality";
        pressingSoundsLikeElement.href = "https://www.youtube.com/watch?v=iubgXSsc_jU";
        pressingSoundsLikeElement.innerText = "you need a break. Go take one.";
    } else if (unit.universal.groovePitch >= 195) {
        pressingHealthElement.innerText = "Very clear sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/master/78439-The-Beach-Boys-Wild-Honey";
        pressingSoundsLikeElement.innerText = "The Beach Boys / Wild Honey";
    } else if (unit.universal.groovePitch >= 125) {
        pressingHealthElement.innerText = "Standard sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/master/23934-The-Beatles-Sgt-Peppers-Lonely-Hearts-Club-Band";
        pressingSoundsLikeElement.innerText = "The Beatles / Sgt. Pepper";
    } else if (unit.universal.groovePitch >= 120) {
        pressingHealthElement.innerText = "Standard sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/1110161-John-Lennon-Plastic-Ono-Band-John-Lennon-Plastic-Ono-Band";
        pressingSoundsLikeElement.innerText = "John Lennon / Plastic Ono Band";
    } else if (unit.universal.groovePitch >= 110) {
        pressingHealthElement.innerText = "Standard sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/2935158-Paul-McCartney-Press-To-Play";
        pressingSoundsLikeElement.innerText = "Paul McCartney / Press To Play";
    } else if (unit.universal.groovePitch >= 105) {
        pressingHealthElement.innerText = "Standard sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/611600-John-Lennon-Walls-And-Bridges";
        pressingSoundsLikeElement.innerText = "John Lennon / Walls And Bridges";
    } else if (unit.universal.groovePitch >= 100) {
        pressingHealthElement.innerText = "Standard sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/master/65554-The-Beatles-Yellow-Submarine-Songtrack";
        pressingSoundsLikeElement.innerText = "The Beatles / Yellow Submarine Songtrack";
    } else if (unit.universal.groovePitch >= 95) {
        pressingHealthElement.innerText = "Slightly fuzzy sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/master/46402-The-Beatles-The-Beatles";
        pressingSoundsLikeElement.innerText = "The Beatles / White Album";
    } else if (unit.universal.groovePitch >= 90) {
        pressingHealthElement.innerText = "Slightly fuzzy sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/3313556-The-Beatles-Past-Masters-Volumes-One-Two";
        pressingSoundsLikeElement.innerText = "The Beatles / Past Masters";
    } else if (unit.universal.groovePitch >= 85) {
        pressingHealthElement.innerText = "Slightly fuzzy sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/1411640-Wings-London-Town";
        pressingSoundsLikeElement.innerText = "Wings / London Town";
    } else if (unit.universal.groovePitch >= 80) {
        pressingHealthElement.innerText = "Slightly fuzzy sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/864772-The-Beatles-Anthology-3";
        pressingSoundsLikeElement.innerText = "The Beatles / Anthology 3";
    } else if (unit.universal.groovePitch >= 75) {
        pressingHealthElement.innerText = "Compressed sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/371466-Miles-Davis-Get-Up-With-It";
        pressingSoundsLikeElement.innerText = "Miles Davis / Get Up With It";
    } else if (unit.universal.groovePitch >= 70) {
        pressingHealthElement.innerText = "Compressed sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/421436-Def-Leppard-Hysteria";
        pressingSoundsLikeElement.innerText = "Def Leppard / Hysteria";
    } else if (unit.universal.groovePitch == 69) {
        pressingHealthElement.innerText = "Nicely compressed sound quality";
        pressingSoundsLikeElement.href = "http://www.discogs.com/master/110519-Karlheinz-Stockhausen-Stimmung";
        pressingSoundsLikeElement.innerText = "Karlheinz Stockhausen / Stimmung";
    } else if (unit.universal.groovePitch >= 65) {
        pressingHealthElement.innerText = "Compressed sound quality";
        pressingSoundsLikeElement.href = "http://www.discogs.com/master/110519-Karlheinz-Stockhausen-Stimmung";
        pressingSoundsLikeElement.innerText = "Karlheinz Stockhausen / Stimmung";
    } else if (unit.universal.groovePitch >= 60) {
        pressingHealthElement.innerText = "Compressed sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/master/962336-La-Monte-Young-Marian-ZazeelaTheatre-Of-Eternal-Music-Dream-House-7817";
        pressingSoundsLikeElement.innerText = "The Theatre of Eternal Music / Dream House 78’16”";
    } else if (unit.universal.groovePitch >= 55) {
        pressingHealthElement.innerText = "Very compressed sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/1364554-Meat-Loaf-Bat-Out-Of-Hell-II-Back-Into-Hell";
        pressingSoundsLikeElement.innerText = "Meat Loaf - Bat Out Of Hell II: Back Into Hell";
    } else if (unit.universal.groovePitch >= 50) {
        pressingHealthElement.innerText = "Very compressed sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/6943383-Mozart-Volume-1";
        pressingSoundsLikeElement.innerText = "Trimicron - Mozart (Volume 1)";
    } else if (unit.universal.groovePitch >= 45) {
        pressingHealthElement.innerText = "Very compressed sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/6864535-Beethoven-Beethoven-I-";
        pressingSoundsLikeElement.innerText = "Trimicron - Beethoven (Volume 1)";
    } else if (unit.universal.groovePitch >= 41) {
        pressingHealthElement.innerText = "Very compressed sound quality";
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/2382820-J-S-Bach-Version-Int%C3%A9grale";
        pressingSoundsLikeElement.innerText = "Trimicron - J. S. Bach";
    } else if (unit.universal.groovePitch < 41) {
        pressingHealthElement.innerText = "u cant press this. idiot. lol";
        pressingSoundsLikeElement.href = "https://www.youtube.com/watch?v=bCI4wK2t7PY";
        pressingSoundsLikeElement.innerText = "you need to sharpen your sticks";
    } else if (vinylPitchElement.innerText.toLowerCase() == "dylan"){
        pressingHealthElement.innerText = "what is wrong with you?";
        pressingSoundsLikeElement.href = "https://discord.com/channels/732862527163203634/732862527632834602/1550524197317386310";
        pressingSoundsLikeElement.innerText = "you're a bit sad";
    } else {
        pressingSoundsLikeElement.href = "https://www.discogs.com/release/3313556-The-Beatles-Past-Masters-Volumes-One-Two";
        pressingSoundsLikeElement.innerText = "The Beatles / “Past Masters";
        pressingHealthElement.innerText = "Sounds good";
    }
}

vinylRecordSizeElement.oninput = () => {
    if (!isNaN(+vinylRecordSizeElement.innerText)) {
        unit.recordSize = +vinylRecordSizeElement.innerText;
        renderUnit();
    }
}

vinylHoleSizeElement.oninput = () => {
    if (!isNaN(+vinylHoleSizeElement.innerText)) {
        unit.holeSize = +vinylHoleSizeElement.innerText;
        renderUnit();
    }
}

vinylRpmElement.oninput = () => {
    unit.universal.rpm = vinylRpmElement.innerText;
    renderUnit();
}

vinylFormatNameElement.oninput = () => {
    unit.formatName = vinylFormatNameElement.innerText;
    renderUnit();
}

vinylBandStartElement.oninput = () => {
    if (!isNaN(+vinylBandStartElement.innerText)) {
        unit.universal.bandStart = +vinylBandStartElement.innerText;
        renderUnit();
    }
}

vinylBandEndElement.oninput = () => {
    if (!isNaN(+vinylBandEndElement.innerText)) {
        unit.universal.bandEnd = +vinylBandEndElement.innerText;
        renderUnit();
    }
}

vinylLabelSizeElement.oninput = () => {
    if (!isNaN(+vinylLabelSizeElement.innerText)) {
        unit.universal.labelSize = +vinylLabelSizeElement.innerText;
        renderUnit();
    }
}

vinylInsideStartElement.oninput = () => {
    if (!isNaN(+vinylInsideStartElement.innerText)) {
        unit.universal.insideStart = vinylInsideStartElement.checked;
        renderUnit();
    }
}

vinylPitchElement.oninput = () => {
    if (!isNaN(+vinylPitchElement.innerText)) {
        unit.universal.groovePitch = +vinylPitchElement.innerText;
        renderUnit();
    }

    updateVinylPitchDescription();
};

vinylPitchElement.onblur = () => {
    // why 40? that's the stereo groove witch, muwhehehehehe!
    // if (unit.universal.groovePitch < 40) unit.universal.groovePitch = +recommendedPitchElement.innerText;
    vinylPitchElement.innerText = unit.universal.groovePitch;
    renderUnit();
    updateVinylPitchDescription();
};

vinylPitchElement.onkeydown = (e) => {
    if (e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
        unit.universal.groovePitch += [1, -1][+(e.key == "ArrowDown" || e.key == "ArrowLeft")];
        vinylPitchElement.innerText = unit.universal.groovePitch;
        renderUnit();
        updateVinylPitchDescription();
    }
};

vinylTrackGapElement.oninput = () => {
    if (!isNaN(+vinylTrackGapElement.innerText)) {
        unit.universal.trackGap = +vinylTrackGapElement.innerText;
        renderUnit();
    }
};

vinylTrackGapElement.onblur = () => {
    if (unit.universal.trackGap < 0) unit.universal.trackGap = 1;
    vinylTrackGapElement.innerText = unit.universal.trackGap;
    renderUnit();
};

vinylTrackGapElement.onkeydown = (e) => {
    if (e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
        unit.universal.trackGap += [0.01, -0.01][+(e.key == "ArrowDown" || e.key == "ArrowLeft")];
        unit.universal.trackGap = Math.max(Math.round(unit.universal.trackGap * 100) / 100, 0);
        vinylTrackGapElement.innerText = unit.universal.trackGap;
        renderUnit();
    }
};

vinylColorElement.oninput = () => {
    unit.vinylColor = vinylColorElement.innerText;
    renderUnit();
};

vinylLabelColorElement.oninput = () => {
    unit.universal.labelColor = vinylLabelColorElement.innerText;
    renderUnit();
};

commentElement.oninput = () => {
    pressing.comment = commentElement.value;
    renderUnit();
};

titleElement.onblur = () => {
    pressing.releaseTitle = titleElement.innerText;
    renderUnit();
};

authorElement.onblur = () => {
    pressing.releaseBy = authorElement.innerText;
    renderUnit();
};

pressElement.onblur = () => {
    pressing.pressingBy = pressElement.innerText;
    renderUnit();
};

dateElement.onblur = () => {
    pressing.releaseDate = dateElement.innerText;
    renderUnit();
};

function setUnit(unitNumber) {
    currentUnit = unitNumber;
    unit = pressing.units[unitNumber];

    updateUnitTables();
    renderUnit();
    updateHTML();
    updateVinylPitchDescription();
}

addUnitElement.onclick = () => {
    pressing.units.push({
        name: "name ur unit. lol",
        type: "phonograph",
        preset: "12” 33rpm",
        vinylColor: "#999999",
        universal: {
            labelColor: "#F07474",
            trackGap: 1,
            groovePitch: 125,
            insideStart: false
        },
        sides: [{
            bands: []
        }, {
            bands: []
        }]
    });

    setUnit(pressing.units.length - 1);
}

vinylGrooveColorsElement.onclick = () => {
    renderUnit();
}

vinylHasNoLabelsElement.onclick = () => {
    unit.universal.hasNoLabel = vinylHasNoLabelsElement.checked;
    renderUnit();
}

vinylSideOneDeleteAllElement.onclick = () => {
    unit.sides[0].bands = [];
    renderUnit();
    updateHTML();
}

vinylSideTwoDeleteAllElement.onclick = () => {
    unit.sides[1].bands = [];
    renderUnit();
    updateHTML();
}

function addTrack(tracklist) {
    tracklist.push({
        title: "Snookeroo",
        writer: "John-Taupin",
        time: 209
    });

    updateUnitTables();
    renderUnit();
    updateHTML();
}

document.getElementById("tracklist-side-one-add-track").onclick = (e) => {
    addTrack(unit.sides[0].bands);
}

document.getElementById("tracklist-side-two-add-track").onclick = (e) => {
    addTrack(unit.sides[1].bands);
}


let pressing = null;
vinylGrooveColorsElement.checked = false;

loadPressing();

let currentUnit = 0;
let unit = pressing.units[0];
let zoom;

setZoomBasedOnSize();
updateUnitTables();
renderUnit();
updateHTML();
updateVinylPitchDescription();
