import '../styles/modal.css'
import '../styles/todo.css'
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {AddModal} from "./modals/AddModal";
import {useState} from "react";
import PropTypes from 'prop-types';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";



export const AddTodo = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>

            <AddModal
                show={isOpen}
                setShow={setIsOpen}
                reloadOnAdd={props.reloadOnAdd}
                reloadFunction={props.reloadFunction}
                loading={props.loading}
                selectedTopic={props.selectedTopic}
            />
            {props.showPointer
                ? <div className="arrow">
                    <ArrowDownwardIcon
                        fontSize="large"
                        color="primary"
                    />
                </div>
                : null
            }
            <div className={"fixedRightContainer"}>
                <Fab size="large" color="primary" aria-label="add" className="fab" onClick={() => {
                    setIsOpen(true);
                }}>
                    <AddIcon/>
                </Fab>
            </div>
        </>
    );
}

AddTodo.defaultProps = {
    reloadOnAdd: false,
    showPointer: false,
};

AddTodo.propType = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    reloadOnAdd: PropTypes.bool,
    reloadFunction: PropTypes.func,
    loading: PropTypes.bool,
    showPointer: PropTypes.bool
}