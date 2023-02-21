import "../styles/todo.css"
import {AddTodo} from "../components/AddTodo";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
export const NoContent = (props) => {

    const [isTopic, setIsTopic] = useState(false);

    useEffect(() => {
        if (props.variant === "topic") {
            setIsTopic(true);
        }
    }, []);


    return(
        <>
            <div className="noTodoContainer">
                <div className="noTodo">
                    {isTopic
                        ? (<p>Ohh, it`s seems like that topic does not exists</p>)
                        : (<p>Ohh, it`s seems you have no ToDo`s</p>)
                    }
                </div>
            </div>

            {/*<div className="ocean">*/}
            {/*    <div className="wave"></div>*/}
            {/*    <div className="wave"></div>*/}
            {/*</div>*/}
            <div className={"fixedRightContainer"}>
                <div className="arrow">
                    <ArrowDownwardIcon
                        fontSize="large"
                        color="primary"
                    />
                </div>
            </div>
            <AddTodo/>
        </>
    )
}

NoContent.propTypes = {
    variant: PropTypes.string,
}