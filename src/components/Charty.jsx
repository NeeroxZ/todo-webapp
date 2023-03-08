import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const today = 33;
const done = 69;
const saved = 5;
const due = 80;

export const Charty = () => {
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

