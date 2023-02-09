import {useState} from "react";
import {Outlet} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import {useAuth} from "../stores/AuthStore";
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
            <div className="topnav" id="myTopnav">
                <a href="#home" className="active">Home</a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <div className="dropdown">
                    <button className="dropbtn">Dropdown
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </div>
                <a href="#about">About</a>
                <a href="" className="icon">&#9776;</a>
            </div>
            <Outlet/>
        </>
    );
};