import "../styles/todo.css"
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
                        ? (<p>Ohh, it seems like that topic does not exists</p>)
                        : (<p>Ohh, it seems you have no ToDo`s</p>)
                    }
                </div>
            </div>

            {/*<AddTodo/>*/}
        </>
    )
}

NoContent.propTypes = {
    variant: PropTypes.string,
}