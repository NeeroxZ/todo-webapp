import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useAuth} from "../../stores/AuthStore";
import React, {useEffect, useState} from "react";
import pb from "../../utils/pocketbase";
import PropTypes from "prop-types";
import {getTodayTime, getTomorrowTime} from "../../utils/time";
import '../../styles/dashboard.css';
import {convertPocketbaseTime} from "../../utils/functions";
import {useGlobalStore} from "../../stores/GlobalStore";


export const Charty = (props) => {
    const {loginValid, getUserId} = useAuth();
    const {mobileView} = useGlobalStore();

    let initData = {"value":0, "max":0, "percentage": "0"}

    const [initialRender, setInitialRender] = useState(true);

    const [todayData, setTodayData] = useState(initData)
    const [doneData, setDoneData] = useState(initData)
    const [savedData, setSavedData] = useState(initData)
    const [dueData, setDueData] = useState(initData)

    const [isLoading, setIsLoading] = useState(true);
    const [noTodos, setNoTodos] = useState(false);

    const loadCounts = async () => {
        props.setReloading(true);
        if (initialRender) {
            setIsLoading(true);
        }
        setNoTodos(false);

        let res = {};
        try {
            console.log("rrq")
            res = await pb.collection('todo').getFullList(1000, {
                filter: `user_id="${getUserId()}"`,
                sort: '-created'
            });

            if (res.filter(e => !e.deleted).length === 0) {
                setNoTodos(true);
                return;
            }

            // create dates
            let currentDate = new Date();
            let twoAhead = new Date();
            let today = getTodayTime();
            let tomorrow = getTomorrowTime();

            // modify twoAhead
            twoAhead.setUTCDate(twoAhead.getUTCDate() + 2);
            twoAhead.setUTCHours(0);
            twoAhead.setUTCMinutes(0);
            twoAhead.setUTCSeconds(0);
            twoAhead.setUTCMilliseconds(0);

            // modify res
            let modRes = res.filter(e => !e["deleted"]);

            // check today
            let tmpToday = {"value": 0, "max": 0, "percentage": "0"};
            let tmpTds = [];
            tmpTds = modRes.filter(e => (((new Date(e.due_date) < tomorrow) && (new Date(e.due_date) > today)) && !e.deleted));
            tmpToday["max"] = tmpTds.length;
            tmpToday["value"] = tmpTds.filter(e => e.done).length;
            tmpToday["percentage"] = ((tmpToday["value"] / tmpToday["max"]) * 100).toFixed(0);
            if (tmpToday["percentage"] === "NaN") {
                tmpToday["percentage"] = "100"
            }
            setTodayData(tmpToday);

            // check done
            let tmpDone = {"value": 0, "max": 0, "percentage": "0"};
            tmpDone["max"] = modRes.length;
            tmpDone["value"] = modRes.filter(e => e.done).length;
            tmpDone["percentage"] = ((tmpDone["value"] / tmpDone["max"]) * 100).toFixed(0);
            if (tmpDone["percentage"] === "NaN") {
                tmpDone["percentage"] = "100"
            }
            setDoneData(tmpDone);

            // check saved
            let tmpSaved = {"value": 0, "max": tmpDone["max"], "percentage": "0"};
            tmpSaved["value"] = modRes.filter(e => e.saved).length;
            tmpSaved["percentage"] = ((tmpSaved["value"] / tmpSaved["max"]) * 100).toFixed(0);
            if (tmpSaved["percentage"] === "NaN") {
                tmpSaved["percentage"] = "100"
            }
            setSavedData(tmpSaved);

            // check due
            let tmpDue = {"value": 0, "max": tmpDone["max"], "percentage": "0"};
            tmpDue["value"] = modRes.filter(e => (convertPocketbaseTime(e.due_date) < currentDate)).length;
            tmpDue["percentage"] = ((tmpDue["value"] / tmpDue["max"]) * 100).toFixed(0);
            if (tmpDue["percentage"] === "NaN") {
                tmpDue["percentage"] = "100"
            }
            setDueData(tmpDue);

        } catch(e) {
            console.log("error getting stats: ", e)
        } finally {
            props.setReloading(false);
            if (initialRender) {
                setIsLoading(false);
            }
        }
    }

    useEffect( () => {
        if (loginValid) {
            loadCounts()
        }
    }, [loginValid, props.triggerReload]);

    useEffect(() => {
        setInitialRender(false)
    }, [])

    const asyncTextStyle = {
        width: "100%",
        height: "100%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
    }

    if (isLoading && initialRender) {
        return (
            <>
                <div className={`containerChart ${mobileView ? "mobile" : ""}`}>
                    <div style={asyncTextStyle} >
                        <div className={`todoHeaderDashboard ${mobileView ? "mobile" : ""}`} style={{color: "white"}}>
                            ...
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (noTodos && !initialRender && !isLoading) {
        return (
            <>
                <div className={`containerChart ${mobileView ? "mobile" : ""}`}>
                    <div style={asyncTextStyle} >
                        <div className={`todoHeaderDashboard ${mobileView ? "mobile" : ""}`} style={{color: "white"}}>
                            Add todos to unlock dashboard
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (!isLoading && !initialRender && !noTodos){
        return (
            <>
                <div className={`containerChart ${mobileView ? "mobile" : ""}`}>
                    <div className={'charty'}>
                        <CircularProgressbar
                            value={parseInt(todayData["percentage"])}
                            text={`${todayData["percentage"]}%`}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#33a382",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                            })}
                        />
                        <div className={'charLabel'}>
                            <strong>Today</strong>
                        </div>
                    </div>
                    <div className={'charty'}>
                        <CircularProgressbar
                            value={parseInt(doneData["percentage"])}
                            text={`${doneData["percentage"]}%`}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#33a382",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                            })}
                        />
                        <div className={'charLabel'}>
                            <strong>Done</strong>
                        </div>
                    </div>
                    <div className={'charty'}>
                        <CircularProgressbar
                            value={parseInt(savedData["percentage"])}
                            text={`${savedData["percentage"]}%`}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#33a382",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                            })}
                        />
                        <div className={'charLabel'}>
                            <strong>Saved</strong>
                        </div>
                    </div>
                    <div className={'charty'}>
                        <CircularProgressbar
                            // value={dueData["percentage"]}
                            value={parseInt(dueData["percentage"])}
                            text={`${dueData["percentage"]}%`}
                            background
                            backgroundPadding={6}
                            styles={buildStyles({
                                backgroundColor: "#33a382",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                            })}

                        />
                        <div className={'charLabel'}>
                            <strong>Due</strong>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

Charty.propTypes = {
    triggerReload: PropTypes.bool,

    reloading: PropTypes.bool,
    setReloading: PropTypes.func,
}

