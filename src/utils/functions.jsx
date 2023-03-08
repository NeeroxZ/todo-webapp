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

export function checkIfDue(datetime) {
    const dtNow = new Date();
    dtNow.setUTCHours(dtNow.getUTCHours() + 1);
    return datetime < dtNow;
}

export function zeroPad(num, places) {
    let zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}