import '../styles/navbar.css';
import {useState} from "react";
export const NavigationBar = () => {
    const [active, setActive] = useState(false);

    const toggleNav = () => {
        console.log(active);
        setActive(!active);
    };


    return (
        <>
            <button onClick={toggleNav}>Toggle</button>
            <nav>

            </nav>
            <div className={`sidebar ${active ? "active" : ""}`}>
                <div className="logo_content">
                    <div className="logo">
                        <i className='bx bxl-c-plus-plus' />
                        <div className="logo_name">ToDo-APP</div>
                    </div>
                    <i className='bx bx-menu' id="btn" />
                </div>
                <ul className="nav_list main">
                    <li>
                        <a href="#">
                            <i className='bx bxs-home'></i>
                            <span className="links_name">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-circle-three-quarter'></i>
                            <span className="links_name">All</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-circle-three-quarter'></i>
                            <span className="links_name">Today</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-circle-three-quarter'></i>
                            <span className="links_name">Tomorrow</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-circle-three-quarter'></i>
                            <span className="links_name">Bookmark</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-building-house'></i>
                            <span className="links_name">Due</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={toggleNav}>
                            <i className='bx bxs-taxi'></i>
                            <span className="links_name">Road trip list</span>
                        </a>
                    </li>

                </ul>
                <ul>
                    <li>
                        <a href="#">
                            <i className='bx bxs-building-house'></i>
                            <span className="links_name">Due</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-building-house'></i>
                            <span className="links_name">Due</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-building-house'></i>
                            <span className="links_name">Due</span>
                        </a>
                    </li>
                </ul>
                <div className="profile_content">
                    <div className="profile">
                        <div className="profile_details">
                            <img src="../assets/images/userIcon.jpg" alt="Hier ist ein bild" />
                                <div className="name_job">
                                    <div className="name">Nick Obreiter</div>
                                    <div className="job">Software Engineer</div>
                                </div>
                        </div>
                        <i className='bx bx-log-out' id="log_out"></i>
                    </div>
                </div>
            </div>

        </>
    );
};