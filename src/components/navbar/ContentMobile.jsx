import {NavLink} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import logo from "../../assets/images/dodo/dodoWithCoffee.png";
import {useAuth} from "../../stores/AuthStore";
import {useTopics} from "../../stores/TopicStore";
import {useGlobalStore} from "../../stores/GlobalStore";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from '@mui/icons-material/Person';

export const ContentMobile = (props) => {
    const {logout} = useAuth();
    const {loading} = useTopics();

    const {showNav, toggleNav} = useGlobalStore();
    return (
        <>
            <a style={{display: "none"}}></a>

            <div className="dropdown">
                <button className="dropbtn">
                    <div className="flexMenuItem">
                        <PersonIcon fontSize="small" className="flexMenuIcon" />
                        <div>Account</div>
                    </div>

                </button>
                <div className="dropdown-content-user">
                    <NavLink to="/about" onClick={toggleNav}>About</NavLink>
                    <NavLink to="/settings" onClick={toggleNav}>Settings</NavLink>
                    <NavLink to="/login" onClick={() => {logout()}}>Logout</NavLink>
                </div>
            </div>
            <NavLink to="/home" className={"home"} onClick={toggleNav}>
                <div className="flexMenuItem">
                    <HomeIcon fontSize="small" className="flexMenuIcon"/>
                    <div>Home</div>
                </div>
            </NavLink>
            <NavLink to="/todo/all" onClick={toggleNav}>All</NavLink>
            <NavLink to="/todo/today" onClick={toggleNav}>Today</NavLink>
            <NavLink to="/todo/tomorrow" onClick={toggleNav}>Tomorrow</NavLink>
            <div className="dropdown">
                <button className="dropbtn">
                    Other
                    <i className="fa fa-caret-down dropdownArrow"></i>
                </button>
                <div className="dropdown-content">
                    <NavLink to="/todo/saved" onClick={toggleNav}>Bookmark</NavLink>
                    <NavLink to="/todo/due" onClick={toggleNav}>Due</NavLink>
                    <NavLink to="/todo/done" onClick={toggleNav}>Done</NavLink>
                    <NavLink to="/todo/deleted" onClick={toggleNav}>Deleted</NavLink>
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

            <a onClick={toggleNav} className="icon">&#9776;</a>
            {!showNav && (
                <div className="leftSide">
                    <div className="logoContainer">
                        <img src={logo} className="logoNav" alt="navbar logo"/>
                    </div>
                    <p>DodoTodo</p>
                </div>
            )
            }

        </>
    );
};