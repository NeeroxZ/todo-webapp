import React, {useEffect} from "react";
import {Chart} from "react-google-charts";
import {useTodoState} from "../hooks/useTodoState";
import {useAuth} from "../stores/AuthStore";
import Todo from "./Todo";

const opts = {
    title: "ToDo´s status",
    defaultColors: [ '#00ccff', '#008800', '#ddaacc', /*Array of colors*/ ]
};

export function TodoChart(props) {
    const auth = useAuth();
    const tds = useTodoState(props);
    const getTimeUntil = () => {
        return new Date().getUTCFullYear();
    };
    let dueValue = 0;
    let day =   new Date().getTime() / 1000
    let done = 0;
    useEffect( () => {
        tds.loadTodos(props);
    }, [props.topic, auth.loginValid]);

    {tds.todos && tds.todos.map((item) => {
        let dmp = new Date(item.due_date).getTime() / 1000
        if(day >= dmp){
            dueValue ++;
        }
        if(item.done){
            done++;
        }
    })}

    const tasks = [
        ["Status", "Count"],
        ["ToDo`s", tds.todos.length - dueValue],
        ["Unfinished", tds.todos.length - done],
        ["Expired", dueValue]
    ];
    console.log(dueValue + " duuuuuues");

    console.log(tds.todos);
    return (
        <>
            <div className="chats">
                <Chart
                    chartType="PieChart"
                    data={tasks}
                    options={opts}
                    width="100%"
                    height="100%"
                    className={'charts'}

                />
            </div>
        </>
    );
}