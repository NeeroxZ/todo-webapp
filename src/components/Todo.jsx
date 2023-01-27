import '../styles/todo.css'
import {Box, Checkbox, Grid, Typography} from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import {useEffect, useState} from "react";
import pb from "../utils/pocketbase";
export const Todo = (props) => {
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState("");
    const [saved, setSaved] = useState(false);
    const [dueDate, setDueDate] = useState(null);
    const [due, setDue] = useState(false);


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkDueDate = () => {
        let time = new Date();
        let currentDate = `${time.getUTCFullYear()}-${time.getUTCMonth()}-${time.getUTCDate()}`;
        let currentTime = `${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}.${time.getUTCMilliseconds()}`;
        let currentDatetime = `${currentDate} ${currentTime}`;

        console.log(time.getMonth());
        console.log(currentDatetime);
    };


    const getData = async() => {
        let res = {};
        try {
            res = await pb.collection('todo').getOne(props.id);
            setData(res);
            setTitle(res.title);
            setDone(res.done);
            setSaved(res.saved);
            setDueDate(res.dueDate);

            setError(null);
        } catch (error) {
            setError(error.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkDueDate();
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
            <div className={`todo-container ${done ? "done" : (saved ? "saved" : "")}`}
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
                        <Typography variant="h5">
                            <Box className={`todo-title ${done ? "done" : ""}`}>
                                {title}
                            </Box>
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