import React from "react";

const tableData = "Data";

export function TodoToday() {
    return (
        <div>
            <h1>ToDo´s Today</h1>
            <table>
                <tbody>
                {tableData}
                </tbody>
            </table>
        </div>
    )
}