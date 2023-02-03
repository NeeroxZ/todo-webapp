
import '../styles/responsiveSidebar.css';
import {useState} from "react";
import {NavLink, Outlet} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import dodo from '../assets/images/userIcon.jpg';
import NavContext from "react-bootstrap/NavContext";
import {useAuth} from "../stores/AuthStore";
import pb from "../utils/pocketbase";
export const NavBar = () => {

    const [open, setOpen] = useState(false);


    if (!pb.authStore.isValid) {
        return;
    }

    const toggleMenu = () => {
        setOpen(!open);
    };


    return (
        <>
            <div className="nav_header">
                <div className="logo">
                    DodoTodo
                </div>
                <nav className={`${open ? "active" : ""}`}>
                    <ul>
                        <li>
                            <NavLink to="/home" onClick={toggleMenu}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/todo/all" onClick={toggleMenu}>All</NavLink>
                        </li>
                        <li>
                            <NavLink to="/todo/today" onClick={toggleMenu}>Today</NavLink>
                        </li>
                        <li>
                            <NavLink to="/todo/tomorrow" onClick={toggleMenu}>Tomorrow</NavLink>
                        </li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <div onClick={toggleMenu} className="menu-toggle"><i className="fa fa-bars"></i></div>
            </div>
            <Outlet/>
        </>
    );
};