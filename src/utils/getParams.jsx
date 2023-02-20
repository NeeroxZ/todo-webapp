

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

    if (filters.topicId) {
        query += ` && topic="${filters.topicId}"`;
    }

    if (filters.tagFilter) {
        let emptyTopics = {topics: []};
        query += ` && tags!=${emptyTopics}`;
    }

    if (filters.dateFrom && filters.dateUntil) {
        if (filters.dateFrom !== "" && filters.dateUntil !== "") {
            query += ` && (due_date >="${filters.dateFrom}" && due_date<="${filters.dateUntil}")`;
        }
    }

    return query;
}