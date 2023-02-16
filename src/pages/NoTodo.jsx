import "../styles/todo.css"
import {AddTodo} from "../components/AddTodo";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
export const NoTodo = () => {
    return(
        <>
            <div className="noTodoContainer">
                <div className="noTodo">
                    <p>Ohhhh it`s seems you have no ToDo`s</p>
                </div>
            </div>

            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
            <div className="arrow">
                <ArrowDownwardIcon
                    fontSize="large"
                    color="primary"
                />
            </div>
            <AddTodo/>
        </>
    )
}