
import '../styles/responsiveSidebar.css';
import {useState} from "react";
import {Outlet} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
export const NavBar = () => {




    return (
        <>
            <header>
                <div className="logo">LOGO</div>
                <nav>
                    <ul>
                        <li><a href="#" className="active">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <div className="menu-toggle"><i className="fa fa-bars"></i></div>
            </header>
            <Outlet />
       </>
    );
};