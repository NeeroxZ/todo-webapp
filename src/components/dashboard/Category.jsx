import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {NavLink} from "react-router-dom";
import {useTopics} from "../../stores/TopicStore";
import {Backdrop, CircularProgress} from "@mui/material";
import {useContext, useState} from "react";
import '../../styles/utlis.css';
export const Category = () => {
    const topics = useTopics();

    const [test, setTest] = useState(true);

    return (
        <div className="dashBox">
            <h3 className="title">Category</h3>

            <a href="#" className="align-left add-category">
                <ControlPointIcon/>
                Add category
            </a>
            {/*{topics.waiting*/}
            {topics.waiting
                ?
                <div className={"circularContainer"}>
                    <Backdrop open={topics.waiting}>
                        <CircularProgress/>
                    </Backdrop>
                </div>
                :
                <ul>
                    {topics.topics && topics.topics.map((item, i) => <li key={i} className={"liste"}>
                        <NavLink  to={`/topic/${item.titleParam}`} className={"topicStyle"}>
                            {item.titleMod}
                        </NavLink>
                    </li>)}
                </ul>
            }

        </div>

    );
};