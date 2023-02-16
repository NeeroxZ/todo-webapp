import {useState} from "react";
import {Outlet} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import {useAuth} from "../stores/AuthStore";
import {NavLink} from "react-router-dom";
import '../styles/navbar.css'


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
            <div className={`topnav ${open?"responsive":""}`} id="myTopnav">
                <a style={{display: "none"}}></a>
                <NavLink to="/home" onClick={toggleMenu}>Home</NavLink>
                <NavLink to="/todo/all" onClick={toggleMenu}>All</NavLink>
                <NavLink to="/todo/today" onClick={toggleMenu}>Today</NavLink>
                <NavLink to="/todo/tomorrow" onClick={toggleMenu}>Tomorrow</NavLink>
                <div className="dropdown">
                    <button className="dropbtn">
                        Category
                        <i className="fa fa-caret-down dropdownArrow"></i>
                    </button>
                    <div className="dropdown-content">
                        <NavLink to="/topic/food" onClick={toggleMenu}>Food</NavLink>
                        <NavLink to="/topic/work" onClick={toggleMenu}>Work</NavLink>
                        <NavLink to="/topic/travel" onClick={toggleMenu}>Travel</NavLink>
                    </div>

                </div>
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