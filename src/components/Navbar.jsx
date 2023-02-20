import {useState} from "react";
import {Outlet} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import {useAuth} from "../stores/AuthStore";
import {NavLink} from "react-router-dom";
import '../styles/navbar.css'
import {useTopics} from "../stores/TopicStore";
import {CircularProgress} from "@mui/material";
import {Todo} from "./Todo";


export const NavBar = () => {
    const {loginValid, logout} = useAuth();
    const {topics, waiting, error} = useTopics();
    const [open, setOpen] = useState(false);

    if (!loginValid) {
        return;
    }

    const toggleMenu = () => {
        setOpen(!open);
    };

    const checkTopics = () => {
        return topics.length !== 0;
    };

    const retTopics = () => {
        if (checkTopics()) {
            return (
                <>
                    {topics.map((item, i) => <NavLink key={i} to={`/topic/${item.titleParam}`} onClick={toggleMenu}>{item.titleMod}</NavLink>)}
                </>
            );
        } else {
            return (
                <a>No topics</a>
            )
        }
    };



    return (
        <>
            <div className={`topnav ${open ? "responsive" : ""}`} id="myTopnav">
                <a style={{display: "none"}}></a>
                <NavLink to="/home" onClick={toggleMenu}>Home</NavLink>
                <NavLink to="/todo/all" onClick={toggleMenu}>All</NavLink>
                <NavLink to="/todo/today" onClick={toggleMenu}>Today</NavLink>
                <NavLink to="/todo/tomorrow" onClick={toggleMenu}>Tomorrow</NavLink>
                {waiting
                    ?
                    <CircularProgress className={"dropdown"}/>
                    :
                    <div className="dropdown">
                        <button className="dropbtn">
                            Category
                            <i className="fa fa-caret-down dropdownArrow"></i>
                        </button>
                        <div className="dropdown-content">
                            {waiting
                                ?
                                <div>loading...</div>
                                :
                                retTopics()}
                        </div>
                    </div>
                }

                <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
                <NavLink to="/login" onClick={() => {
                    logout();
                }}>Logout</NavLink>
                <a onClick={() => {
                    toggleMenu();
                }} className="icon">&#9776;</a>
            </div>
            <Outlet/>
        </>
    );
};
