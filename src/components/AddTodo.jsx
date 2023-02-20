import '../styles/modal.css'
import '../styles/todo.css'
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {AddModal} from "./AddModal";
import {useState} from "react";


export const AddTodo = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
            <>
            <AddModal show={isOpen} setShow={setIsOpen}/>
                <div className="modalPopup">
                    <Fab size="medium" color="primary" aria-label="add" className="fab" onClick={() => {
                        setIsOpen(true);}}>
                    <AddIcon/>
                    </Fab>
                </div>
            </>
        );
}