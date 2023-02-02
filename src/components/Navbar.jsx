
import '../styles/responsiveSidebar.css';
import {useState} from "react";
import {Outlet} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
export const NavBar = () => {

    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };


    return (
        <>
            <header>
                <div className="logo">LOGO</div>
                <nav className={`${open?"active":""}`}>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <div onClick={toggleMenu} className="menu-toggle"><i className="fa fa-bars"></i></div>
            </header>
            <Outlet />
       </>
    );
};