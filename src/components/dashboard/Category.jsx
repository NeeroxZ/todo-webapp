import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {NavLink} from "react-router-dom";
import {useTopics} from "../../stores/TopicStore";
import {Backdrop, CircularProgress} from "@mui/material";
import {useContext, useState} from "react";
import '../../styles/utlis.css';
import {TopicModal} from "../modals/TopicModal";
export const Category = () => {
    const topics = useTopics();

    const [show, setShow] = useState(false);

    return (
        <>
            <div className="dashBox">
                <h3 className="title">Topics</h3>

                <a href="#" className="align-left add-category" onClick={() => {
                    setShow(true);
                }}>
                    <ControlPointIcon/>
                    Add topic
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
                        <li className="liste">
                            Test
                        </li>
                        <li className="liste">
                            Test
                        </li>
                        <li className="liste">
                            Test
                        </li>
                        {topics.topics && topics.topics.map((item, i) => <li key={i} className={"liste"}>
                            <NavLink to={`/topic/${item.titleParam}`} className={"topicStyle"}>
                                {item.titleMod}
                            </NavLink>
                        </li>)}
                    </ul>
                }

            </div>
            <TopicModal show={show} setShow={setShow}/>
        </>

    );
};