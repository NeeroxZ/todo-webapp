import {zeroPad} from "./functions";


export function getParams(filters, userId) {
    let query = `user_id="${userId}"`;
    if (filters.bookmarkFilter) {
        query += " && saved=true";
    }
    if (filters.deletedFilter) {
        query += " && deleted=true"
    } else {
        query += " && deleted=false"
    }

    if (filters.topic) {
        query += ` && topic="${filters.topic.id}"`;
    }

    if (filters.tagFilter) {
        let emptyTopics = {topics: []};
        query += ` && tags!=${emptyTopics}`;
    }

    if (filters.dateFrom && filters.dateUntil) {
        if (filters.dateFrom !== "" && filters.dateUntil !== "") {
            let df = convertToPocketbaseDate(filters.dateFrom);
            let du = convertToPocketbaseDate(filters.dateUntil);
            query += ` && (due_date >="${df}" && due_date<="${du}")`;
        }
    } else if (!filters.dateFrom && filters.dateUntil) {
        if (filters.dateUntil !== "") {
            let du = convertToPocketbaseDate(filters.dateUntil);
            query += ` && due_date < "${du}"`;
        }
    }

    return query;
}

function convertToPocketbaseDate(dt) {
    let year = dt.getUTCFullYear();
    let month = (dt.getUTCMonth() +1).toString();
    let date = dt.getUTCDate().toString().slice(-2);
    let hours = dt.getUTCHours().toString().slice(-2);
    let min = dt.getUTCMinutes().toString().slice(-2);
    let sec = dt.getUTCSeconds().toString().slice(-2);
    let mSec = dt.getUTCMilliseconds().toString().slice(-3);

    let currentDate = `${year}-${zeroPad(month, 2)}-${zeroPad(date, 2)}`;
    let currentTime = `${zeroPad(hours, 2)}:${zeroPad(min, 2)}:${zeroPad(sec, 2)}`;
    currentTime += `.${zeroPad(mSec, 3)}Z`
    return `${currentDate} ${currentTime}`;
}