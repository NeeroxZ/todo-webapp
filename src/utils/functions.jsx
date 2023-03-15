import {getNowTime} from "./time";

export function checkIfDue(datetime) {
    return datetime < getNowTime();
}

export function convertPocketbaseTime(datetime) {
    let t = new Date(datetime);
    t.setHours(t.getHours() - 1);
    return t;
}

export function zeroPad(num, places) {
    let zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

export const validateEmail = (email) => {
    let reg = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )

    return reg !== null;
};