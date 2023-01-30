export function convertDateTime(datetime) {
    let dt = {
        year: "",
        month: "",
        day: "",
        hour: "",
        minute: "",
        second: "",
        millisecond: ""
    }

    let iStart = 0;
    let iStop = datetime.indexOf("-");
    dt.year = datetime.slice(iStart, iStop);
    iStart = iStop + 1;

    iStop = datetime.indexOf("-", iStart);
    dt.month = datetime.slice(iStart, iStop);
    iStart = iStop + 1;

    iStop = datetime.indexOf(" ", iStart);
    dt.day = datetime.slice(iStart, iStop);
    iStart = iStop + 1;

    iStop = datetime.indexOf(":", iStart);
    dt.hour = datetime.slice(iStart, iStop);
    iStart = iStop + 1;

    iStop = datetime.indexOf(":", iStart);
    dt.minute = datetime.slice(iStart, iStop);
    iStart = iStop + 1;

    iStop = datetime.indexOf(".", iStart);
    dt.second = datetime.slice(iStart, iStop);
    iStart = iStop + 1;

    iStop = datetime.indexOf("Z", iStart);
    dt.millisecond = datetime.slice(iStart, iStop);

    return dt;
}