import React from "react";
import {Chart} from "react-google-charts";

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
            charttype="PieChart"
            data={tasks}
            options={opts}
            width={"350px"}
            height={"400px"}
        />
    );
}