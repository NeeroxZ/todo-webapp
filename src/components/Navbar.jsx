import '../styles/navbar.css';

export const NavigationBar = () => {

    return (
        <>
            <div className="sidebar">
                <div className="logo_content">
                    <div className="logo">
                        <i className='bx bxl-c-plus-plus'></i>
                        <div className="logo_name">ToDo-APP</div>
                    </div>
                    <i className='bx bx-menu' id="btn"></i>
                </div>
                <ul className="nav_list">
                    <li>
                        <i className='bx bx-search'></i>
                        <input type="text" placeholder="Search..." className="links_name"></input>
                        <!-- <span class="tooltip"> Dashboard </span>> -->
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-home'></i>
                            <span className="links_name">Home</span>
                        </a>
                        <!-- <span class="tooltip"> Dashboard </span>> -->
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-grid-alt'></i>
                            <span className="links_name">User</span>
                        </a>
                        <!-- <span class="tooltip"> Dashboard </span>> -->
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-circle-three-quarter'></i>
                            <span className="links_name">Today</span>
                        </a>
                        <!-- <span class="tooltip"> Dashboard </span>> -->
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-circle-three-quarter'></i>
                            <span className="links_name">Personal</span>
                        </a>
                        <!-- <span class="tooltip"> Dashboard </span>> -->
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-circle-three-quarter'></i>
                            <span className="links_name">Work</span>
                        </a>
                        <!-- <span class="tooltip"> Dashboard </span>> -->
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-building-house'></i>
                            <span className="links_name">House</span>
                        </a>
                        <!-- <span class="tooltip"> Dashboard </span>> -->
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bxs-taxi'></i>
                            <span className="links_name">Road trip list</span>
                        </a>
                        <!-- <span class="tooltip"> Dashboard </span>> -->
                    </li>
                </ul>
                <div className="profile_content">
                    <div className="profile">
                        <div className="profile_details">
                            <img src="../user.jpg" alt="Hier ist ein bild" />
                                <div className="name_job">
                                    <div className="name">Nick Obreiter</div>
                                    <div className="job">Software Engineer</div>
                                </div>
                        </div>
                        <i className='bx bx-log-out' id="log_out"></i>
                    </div>
                </div>
            </div>
            <div className="home_container">

            </div>
        </>
    );
};