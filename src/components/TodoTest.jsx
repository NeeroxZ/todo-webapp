import {Checkbox, Grid, Typography} from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {checkIfDue, zeroPad} from "../utils/functions";
import pb from "../utils/pocketbase";
import '../styles/todo.css'
import Grow from '@mui/material/Grow';


export const TodoTest = (props) => {
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState("");
    const [saved, setSaved] = useState(false);
    const [comment, setComment] = useState("");
    const [topic, setTopic] = useState("");
    const [due, setDue] = useState(false);
    const [date, setDate] = useState(new Date());
    const [repetitive, setRepetitive] = useState("");

    const [test, setTest] = useState(false);


    const getData = async() => {
        let res = {};
        try {
            res = await pb.collection('todo').getOne(props.id);
            setData(res);
            setTitle(res.title);
            setDone(res.done);
            setSaved(res.saved);
            setComment(res.comment);
            setTopic(res.topic);

            // check if element is due
            let resDate = new Date(res.due_date);
            resDate.setHours(resDate.getHours() - 1);
            setDate(resDate);
            if (checkIfDue(resDate)) {
                setDue(true);
            } else {
                setDue(false);
            }

            setError(null);
        } catch (error) {
            setError(error.message);
            setData(null);
        } finally {
            setLoading(false);
            props.doneLoading();
        }
    };

    useEffect(() => {
        getData();
    }, []);


    const handleChange = (event) => {
        event.stopPropagation();
        setDone(event.target.checked);

        let data = {
            done: event.target.checked,
        }
        updateTodo(data)
            .catch((error) => {
                alert("could not sync with database: " + error.toString())
            })
    };

    const updateTodo = async (data) => {
        await pb.collection('todo').update(props.id, data);
        getData()
            .catch((error) => {
                alert("could not sync with database: " + error.toString());
            });
    };

    const handleSaved = async (event) => {
        event.stopPropagation();
        setSaved(event.target.checked);
        let data = {
            saved: event.target.checked,
        }
        updateTodo(data)
            .catch((error) => {
                alert("could not sync with database: " + error.toString())
            })
    };

    const handleOpenModal = (e) => {
        if (!props.disableEdit) {
            props.setEditDate({
                id: props.id,
                title: title,
                done: done,
                comment: comment,
                date: date,
                topic: topic,
                saved: saved,
            });
            props.setShowEdit(true);
        }
    };

    return (
        <>
            <div className={`todo-container ${done
                ? "done"
                : (saved ? "saved" : "")} ${due ? "due" : ""}`}
                 onClick={(e) => handleOpenModal(e)}
            >
                <Grid container direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      gap={0}
                >
                    <Grid item xs={10} md={10} className={"todo-front"}>
                        <Checkbox
                            icon={<RadioButtonUncheckedIcon color={"textWhite"}/>}
                            checked={done}
                            checkedIcon={<RadioButtonCheckedIcon color={"textWhite"}/>}
                            color={"textWhite"}
                            className={"todo-done"}
                            onClick={handleChange}
                        />
                        <Typography variant="h5" color={"textWhite"} className={`todo-title ${done ? "done" : ""}`}
                                    onMouseEnter={() => {

                                    }}
                        >
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <div className={"todo-icon"}>
                            <Checkbox
                                icon={<BookmarkBorder color="textWhite"/>}
                                checked={saved}
                                checkedIcon={<Bookmark color="textWhite"/>}
                                className={"todo-done"}
                                onClick={handleSaved}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};