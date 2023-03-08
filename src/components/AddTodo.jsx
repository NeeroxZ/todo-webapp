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
                // modal props
                show={isOpen}
                setShow={setIsOpen}
                reloadOnAdd={props.reloadOnAdd}
                reloadTodos={props.reloadTodos}
                reloading={props.reloading}
                selectedTopic={props.selectedTopic}

                // external reload
                reloadingExternal={props.externalReload}
                triggerExternal={props.triggerExternal}
                setTriggerExternal={props.setTriggerExternal}
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
    reloadOnAdd: true,
    showPointer: false,
};

AddTodo.propType = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    reloadOnAdd: PropTypes.bool,
    reloadTodos: PropTypes.func,
    reloading: PropTypes.bool,
    showPointer: PropTypes.bool,

    externalReload: PropTypes.bool,
    triggerExternal: PropTypes.bool,
    setTriggerExternal: PropTypes.func,
}