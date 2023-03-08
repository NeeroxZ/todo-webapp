import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useAuth} from "../stores/AuthStore";
import {useEffect, useState} from "react";
import pb from "../utils/pocketbase";

const today = 33;
const done = 69;
const saved = 5;
const due = 80;

export const Charty = (props) => {
    const {loginValid, getUserId} = useAuth();

    const [data, setData] = useState([
        ["Status", "Count"],
        ["Due", 1],
        ["Todo", 1],
        ["Done", 1]
    ]);

    const [todayData, setTodayData] = useState({"value":0, "max":0})
    const [doneData, setDoneData] = useState({"value":0, "max":0})
    const [savedData, setSavedData] = useState({"value":0, "max":0})
    const [dueData, setDueData] = useState({"value":0, "max":0})


    const [resError, setResError] = useState(false);
    const [resLoading, setResLoading] = useState(true);

    const loadCounts = async () => {
        setResLoading(false);
        setResError(false);
        let res = {};
        let newData = [["Status", "Count"]];
        try {
            res = await pb.collection('todo').getFullList(1000, {
                filter: `user_id="${getUserId()}"`,
                sort: '-created'
            });

            // create dates
            let currentDate = new Date();
            let today = currentDate;
            let tomorrow = currentDate;

            // modify today
            today.setUTCHours(0);
            today.setUTCMinutes(0);
            today.setUTCSeconds(0);
            today.setUTCMilliseconds(0);

            // modify tomorrow
            tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
            tomorrow.setUTCHours(0);
            tomorrow.setUTCMinutes(0);
            tomorrow.setUTCSeconds(0);
            tomorrow.setUTCMilliseconds(0);

            // modify twoAhead
            let twoAhead = tomorrow;
            twoAhead.setUTCDate(twoAhead.getUTCDate() + 1);

            // check today
            let tmpToday = {"value": 0, "max": 0};
            let tmpTds = []
            tmpTds = res.filter(e => (((new Date(e.due_date) < tomorrow) && (new Date(e.due_date) > today)) && !e.deleted))
            tmpToday["max"] = tmpTds.length
            tmpToday["value"] = tmpTds.filter(e => e.done);
            setTodayData(tmpToday);

            // check today
            newData.push(["Due", res.filter((e) => ((new Date(e.due_date)) < currentDate)).length])
            newData.push(["Due", res.filter((e) => ((new Date(e.due_date)) < currentDate)).length])


            // todo
            newData.push(["Todo", res.filter((e) => !e.done).length])

            // done
            newData.push(["Done", res.filter((e) => e.done).length])
            setData(newData);
        } catch(e) {
            console.log("error getting stats: ", e)
            setResError(true);
        } finally {
            setResLoading(false);
        }
    }

    useEffect(() => {
        if (loginValid) {
            loadCounts();
        }
    }, [loginValid])
    return(
        <>
            <div className={'containerChart'} style={{display:'flex'}}>

                <div className={'charty'}>
                    <CircularProgressbar
                        value={today}
                        text={`${today}%`}
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
                        value={done}
                        text={`${done}%`}
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
                        value={saved}
                        text={`${saved}%`}
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
                        value={due}
                        text={`${due}%`}
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
                        <strong>DUE</strong>
                    </div>
                </div>
            </div>
        </>

    )
}

