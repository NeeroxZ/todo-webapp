import '../styles/todo.css'
import {Checkbox, Grid, Typography} from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {zeroPad} from "../utils/functions";
import pb from "../utils/pocketbase";

export const Todo = (props) => {
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState("");
    const [saved, setSaved] = useState(false);
    const [due, setDue] = useState(false);


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkDueDate = () => {
        let time = new Date();
        let year = time.getUTCFullYear();
        let month = (time.getUTCMonth() +1).toString();
        let date = time.getUTCDate().toString().slice(-2);
        let hours = time.getUTCHours().toString().slice(-2);
        let min = time.getUTCMinutes().toString().slice(-2);
        let sec = time.getUTCSeconds().toString().slice(-2);
        let mSec = time.getUTCMilliseconds().toString().slice(-3);

        let currentDate = `${year}-${zeroPad(month, 2)}-${zeroPad(date, 2)}`;
        let currentTime = `${zeroPad(hours, 2)}:${zeroPad(min, 2)}:${zeroPad(sec, 2)}`;
        currentTime += `.${zeroPad(mSec, 3)}Z`
        return `${currentDate} ${currentTime}`;
    };


    const getData = async() => {
        let res = {};
        try {
            res = await pb.collection('todo').getOne(props.id);
            setData(res);
            setTitle(res.title);
            setDone(res.done);
            setSaved(res.saved);

            if (res.due_date < checkDueDate()) {
                setDue(true);
            }
            checkDueDate();

            setError(null);
        } catch (error) {
            setError(error.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);


    const handleChange = (event) => {
        // event.stopPropagation();
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
        setSaved(event.target.checked);
        let data = {
            saved: event.target.checked,
        }
        await pb.collection('todo').update(props.id, data);
        getData();
    };

    const handleOpenModal = (e) => {
        console.log("open modal");
    };

    /* Use effect
    *  fetch data
    *
    * */

    return (
        <>
            <div className={`todo-container ${done ? "done" : (saved ? "saved" : "")} `}
                 onClick={(e) => handleOpenModal(e)}
            >
                <Grid container direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      gap={0}
                >
                    <Grid item xs={10} md={10} className={"todo-front"}>
                        <Checkbox
                            icon={<RadioButtonUncheckedIcon/>}
                            checked={done}
                            checkedIcon={<RadioButtonCheckedIcon/>}
                            className={"todo-done"}
                            onChange={handleChange}
                        />
                        <Typography variant="h5" className={`todo-title ${done ? "done" : ""}`}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <div className={"todo-icon"}>
                            <Checkbox
                                icon={<BookmarkBorder/>}
                                checked={saved}
                                checkedIcon={<Bookmark/>}
                                className={"todo-done"}
                                onChange={handleSaved}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};