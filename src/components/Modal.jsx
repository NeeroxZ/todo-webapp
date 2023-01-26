// @src/components/Modal.jsx

import React, {useState} from "react";
import styles from "../styles/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import {TextField} from "@mui/material";
import {BlockPicker} from "react-color";

const Modal = ({ setIsOpen }) => {
    const [title, setTitle] = useState(null);
    const [colorState, setColorState] = useState(false);

    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>Dialog</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>
                    <div className={styles.modalContent}>
                        Are you sure you want to delete the item?
                        <TextField label="Title" onBlur={e => setTitle(e.target.value)} />
                        <BlockPicker />
                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <button
                                className={styles.cancelBtn}
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;