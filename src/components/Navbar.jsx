import '../styles/responsiveSidebar.css';
import {useState} from "react";
import {NavLink, Outlet} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import dodo from '../assets/images/userIcon.jpg';
import {useAuth} from "../stores/AuthStore";
import {Submenu} from "./Submenu";
export const NavBar = () => {
    const {loginValid, logout} = useAuth();
    const [open, setOpen] = useState(false);

    if (!loginValid) {
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
                    <ul className="nav_list">
                        <li className="nav_item">
                            <NavLink to="/home" onClick={toggleMenu}>Home</NavLink>
                        </li>
                        <li className="nav_item">
                            <NavLink to="/todo/all" onClick={toggleMenu}>All</NavLink>
                        </li>
                        <li className="nav_item">
                            <NavLink to="/todo/today" onClick={toggleMenu}>Today</NavLink>
                        </li>
                        <li className="nav_item">
                            <NavLink to="/todo/tomorrow" onClick={toggleMenu}>Tomorrow</NavLink>
                        </li>
                        <Submenu name="Testing"/>
                        <li className="nav_item">
                            <NavLink to="/login" onClick={() => {
                                logout();
                            }}>Login</NavLink>
                        </li>
                    </ul>
                </nav>
                <div onClick={toggleMenu} className="menu-toggle"><i className="fa fa-bars"></i></div>
            </div>
            <Outlet/>
        </>
    );
};