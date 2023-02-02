import React from "react";

const tableData = "Data";

export function todoToday() {
    return (
        <div>
            <h1 id='title'>React Dynamic Table</h1>
            <table id='students'>
                <tbody>
                {tableData()}
                </tbody>
            </table>
        </div>
    )
}