import React, {useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import pb from "../utils/pocketbase";
import {useTodoState} from "../hooks/useTodoState";
import {useAuth} from "../stores/AuthStore";

const tasks = [
    ["Status", "Count"],
    ["Done", 4],
    ["Finished", 7],
    ["Expired", 2]
];

const opts = {
    // title: "ToDo´s status",
    // titleTextStyle: {
    //     color: '#fdfdfdce'
    // }
    baselineColor: 'white',
    legendTextStyle: { color: '#FFF' },
    titleTextStyle: { color: '#FFF' },
};

export function TodoChart() {
    const {loginValid, getUserId} = useAuth();

    const [data, setData] = useState([
        ["Status", "Count"],
        ["Due", 1],
        ["Todo", 1],
        ["Done", 1]
    ]);

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

            // check due
            let currentDate = new Date();
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

    return (
        <div style={{
            color: "white",
            fontSize: "1rem",
            // width: "100%",
            // height: "94%",
        }}>
            <Chart
                chartType="PieChart"
                data={data}
                options={opts}
                width="100%"
                height="100%"

            />
        </div>
    );
}