import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useAuth} from "../../stores/AuthStore";
import {useEffect, useState} from "react";
import pb from "../../utils/pocketbase";
import PropTypes from "prop-types";
import {AllTodosCount} from "./AllTodosCount";
import {getTodayTime, getTomorrowTime} from "../../utils/time";


export const Charty = (props) => {
    const {loginValid, getUserId} = useAuth();

    let initData = {"value":0, "max":0, "percentage": "0"}

    const [todayData, setTodayData] = useState(initData)
    const [doneData, setDoneData] = useState(initData)
    const [savedData, setSavedData] = useState(initData)
    const [dueData, setDueData] = useState(initData)


    const [resError, setResError] = useState(false);
    const [resLoading, setResLoading] = useState(true);

    const loadCounts = async () => {
        setResLoading(true);
        setResError(false);
        props.setReloading(true);
        let res = {};
        try {
            res = await pb.collection('todo').getFullList(1000, {
                filter: `user_id="${getUserId()}"`,
                sort: '-created'
            });

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

            // check today
            let tmpToday = {"value": 0, "max": 0, "percentage": "0"};
            let tmpTds = [];
            tmpTds = res.filter(e => (((new Date(e.due_date) < tomorrow) && (new Date(e.due_date) > today)) && !e.deleted));
            tmpToday["max"] = tmpTds.length;
            tmpToday["value"] = tmpTds.filter(e => e.done).length;
            tmpToday["percentage"] = ((tmpToday["value"] / tmpToday["max"]) * 100).toFixed(0);
            if (tmpToday["percentage"] === "NaN") {
                tmpToday["percentage"] = "100"
            }
            setTodayData(tmpToday);

            // check done
            let tmpDone = {"value": 0, "max": 0, "percentage": "0"};
            tmpTds = res.filter(e => !e.deleted);
            tmpDone["max"] = tmpTds.length;
            tmpDone["value"] = tmpTds.filter(e => e.done).length;
            tmpDone["percentage"] = ((tmpDone["value"] / tmpDone["max"]) * 100).toFixed(0);
            setDoneData(tmpDone);

            // check saved
            let tmpSaved = {"value": 0, "max": tmpDone["max"], "percentage": "0"};
            tmpSaved["value"] = tmpTds.filter(e => e.saved).length;
            tmpSaved["percentage"] = ((tmpSaved["value"] / tmpSaved["max"]) * 100).toFixed(0);
            setSavedData(tmpSaved);

            // check due
            let tmpDue = {"value": 0, "max": tmpDone["max"], "percentage": "0"};
            tmpDue["value"] = tmpTds.filter(e => (new Date(e.due_date) < currentDate)).length;
            tmpDue["percentage"] = ((tmpDue["value"] / tmpDue["max"]) * 100).toFixed(0);
            setDueData(tmpDue);

        } catch(e) {
            console.log("error getting stats: ", e)
            setResError(true);
        } finally {
            setResLoading(false);
            props.setReloading(false);
        }
    }

    useEffect(() => {
        if (loginValid) {
            loadCounts();
        }
    }, [loginValid, props.triggerReload])
    return(
        <>
            <div className={'containerChart'} style={{display:'flex'}}>

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

    )
}

Charty.propTypes = {
    triggerReload: PropTypes.bool,

    reloading: PropTypes.bool,
    setReloading: PropTypes.func,
}

