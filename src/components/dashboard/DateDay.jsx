
export const DateDay = () => {
    const date = new Date();
    const day = date.toLocaleDateString("default", { day: "numeric" })
    const month = date.toLocaleDateString("default",{month:"long"});

    return(
        <div className="item-a dash-box">
            <div>
                <div className="date-month">{month}</div>
                <div className="d-flex align-center">
                    <div className="date-day">{day}</div>
                </div>
            </div>
        </div>
    )
}
