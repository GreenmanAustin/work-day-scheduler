var schedule = {};
var times = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var DateTime = luxon.DateTime;
function getNumberSuffix() {
    num = DateTime.now().day;
    const th = 'th'
    const rd = 'rd'
    const nd = 'nd'
    const st = 'st'

    if (num === 11 || num === 12 || num === 13) return th

    let lastDigit = num.toString().slice(-1)

    switch (lastDigit) {
        case '1': return st
        case '2': return nd
        case '3': return rd
        default: return th
    }
}
var renderPage = () => {
    schedule = JSON.parse(localStorage.getItem("schedule"));
    if (!schedule) {
        schedule = {};
    }
    $("#currentDay").text(`${DateTime.now().weekdayLong}, ${DateTime.now().monthLong} ${DateTime.now().day}${getNumberSuffix()}`);
    for (var i = 0; i < times.length; i++) {
        var timeRow = $("<div>")
            .addClass("row time-row")
            .attr("id", "timerow-" + (i + 9));

        var leftRow = $("<div>")
            .addClass("col-md-1 left-row")
            .text(times[i]);
        if (i === times.length - 1) {
            leftRow.addClass("last-left-row");
        };


        var midRow = $("<div>")
            .addClass("col-md-10 middle-row")
            .attr({
                id: "middlerow",
                "data-timerow": (i + 9)
            })
            .text(schedule[i] || "");

        if (DateTime.now().hour > (i + 9)) {
            midRow.css("background-color", "#D7DBDD");
        } else if (DateTime.now().hour === (i + 9)) {
            midRow.css("background-color", "#EB4B24");
        }
        else {
            midRow.css("background-color", "#8FDF95");
        }
        var rightRow = $("<div>")
            .addClass("col-md-1 right-row oi oi-lock-locked")
            .attr({
                id: "rightrow",
                "data-timerow": i
            });

        timeRow.append(leftRow, midRow, rightRow);
        $("#schedule-container").append(timeRow)
    };
};


renderPage();

$("#schedule-container").on("click", "#middlerow", function () {
    var text = $(this)
        .text()
        .trim();
    var dataNum = $(this).attr("data-timerow");
    var backgroundColor = $(this).css("background-color");
    var textInput = $("<textarea>")
        .val(text)
        .addClass("col-md-10 text-row")
        .css("background-color", backgroundColor);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
    $(".text-row").on("blur", function () {
        // get current value of textarea
        var text = $(this).val();

        // get status type and position in the list

        // recreate p element
        var taskP = $("<div>")
            .addClass("col-md-10 middle-row")
            .attr({
                id: "middlerow",
                "data-timerow": dataNum
            })
            .css("background-color", backgroundColor)
            .text(text);

        // replace textarea with new content
        $(this).replaceWith(taskP);
    });
});

$("#schedule-container").on("click", "#rightrow", function () {
    var row = parseInt($(this).attr("data-timerow"));
    var dataRow = row + 9;
    var scheduleText = $("div")
        .find("[data-timerow='" + dataRow + "']")
        .text();
    schedule[row] = scheduleText;
    console.log(schedule);
    localStorage.setItem("schedule", JSON.stringify(schedule));






})