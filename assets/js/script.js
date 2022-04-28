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
    $("#currentDay").text(`${DateTime.now().weekdayLong}, ${DateTime.now().monthLong} ${DateTime.now().day}${getNumberSuffix()}`);
    for (var i = 0; i < times.length; i++) {
        var timeRow = $("<div>")
            .addClass("row time-row")
            .attr("id", "timerow-" + (i + 9));

        var leftRow = $("<div>")
            .addClass("col-md-1 left-row")
            .text(times[i]);

        var midRow = $("<div>")
            .addClass("col-md-10");

        if (DateTime.now().hour > (i + 9)) {
            midRow.css("background-color", "gray");
        } else if (DateTime.now().hour === (i + 9)) {
            midRow.css("background-color", "red");
        }
        else {
            midRow.css("background-color", "green");
        }
        var rightRow = $("<div>")
            .addClass("col-md-1 right-row");
        timeRow.append(leftRow, midRow, rightRow);
        $("#schedule-container").append(timeRow)
    };
};


renderPage();


