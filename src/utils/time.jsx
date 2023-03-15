export const getNowTime = () => {
    return new Date();
}

export const getTodayTime = () => {
    let t = new Date();
    t.setHours(0);
    t.setUTCMinutes(0);
    t.setUTCSeconds(0);
    t.setUTCMilliseconds(1);
    return t;
};

export const getTomorrowTime = () => {
    let t = new Date();
    t.setDate(t.getDate() + 1);
    t.setHours(0);
    t.setUTCMinutes(0);
    t.setUTCSeconds(0);
    t.setUTCMilliseconds(1);
    return t;
};

export const getTwoAheadTime = () => {
    let t = new Date();
    t.setDate(t.getDate() + 2);
    t.setHours(0);
    t.setUTCMinutes(0);
    t.setUTCSeconds(0);
    t.setUTCMilliseconds(1);
    return t;
}