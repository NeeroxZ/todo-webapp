import '../styles/modal.css'
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./Modal";


function openModal() {
    return <Modal/>
}

export const AddTodo = () => {

     return (
         <>
             <diy className="modalPopup">
                <Fab size="medium" color="primary" aria-label="add" className="addIcon" onClick={openModal()}>
                    <AddIcon />
                </Fab>
             </diy>
         </>
     );
 };