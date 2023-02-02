import React from "react";
import {Chart} from "react-google-charts";
import "../styles/dashboard.css";

const tasks = [
    ["Status", "Count"],
    ["Finished", 4],
    ["Unfinished", 7],
    ["Expired", 2]
];

const opts = {
    title: "ToDo´s status",
};

export function TodoChart() {
    return (
        <Chart
            chartType="PieChart"
            data={tasks}
            options={opts}
            width="100%"
            height="100%"
        />
    );
}