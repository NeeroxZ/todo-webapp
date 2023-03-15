import {NavLink} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import logo from "../../assets/images/dodo/dodoWithCoffee.png";
import {useAuth} from "../../stores/AuthStore";
import {useTopics} from "../../stores/TopicStore";
import HomeIcon from '@mui/icons-material/Home';

export const ContentDesktop = (props) => {

    const {logout} = useAuth();
    const {loading} = useTopics();

    return (
        <>
            <a style={{display: "none"}}></a>

            <div className="dropdown">
                <button className="dropbtn">
                    <i className="fa fa-user" aria-hidden="true"></i>
                </button>
                <div className="dropdown-content-user">
                    <NavLink to="/user">User</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/login" onClick={() => {
                        logout();
                    }}>Logout</NavLink>
                </div>
            </div>

            <div className="dropdown">
                <button className="dropbtn">
                    Other
                    <i className="fa fa-caret-down dropdownArrow"></i>
                </button>
                <div className="dropdown-content">
                    <NavLink to="/todo/saved">Bookmark</NavLink>
                    <NavLink to="/todo/due">Due</NavLink>
                    <NavLink to="/todo/done">Done</NavLink>
                    <NavLink to="/todo/deleted">Deleted</NavLink>
                </div>
            </div>

            {loading
                ?
                <CircularProgress className={"dropdown"}/>
                :
                <div className="dropdown">
                    <button className="dropbtn">
                        Topics
                        <i className="fa fa-caret-down dropdownArrow"></i>
                    </button>
                    <div className="dropdown-content">
                        {loading
                            ?
                            <div>loading...</div>
                            :
                            props.returnTopics()}
                    </div>
                </div>
            }

            <NavLink to="/todo/tomorrow">Tomorrow</NavLink>
            <NavLink to="/todo/today">Today</NavLink>
            <NavLink to="/todo/all">All</NavLink>
            <NavLink to="/home" className={"home"}>
                <div className="flexMenuItem">
                    <HomeIcon fontSize="small" className="flexMenuIcon" />
                    <div>Home</div>
                </div>
            </NavLink>

            <a className="icon">&#9776;</a>
            <div className="leftSide">
                <div className="logoContainer">
                    <img src={logo} className="logoNav" alt="navbar logo" />
                </div>
                <p>DodoTodo</p>
            </div>
        </>
    );
};