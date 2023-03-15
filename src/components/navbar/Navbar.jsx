import {Outlet} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import {useAuth} from "../../stores/AuthStore";
import {NavLink} from "react-router-dom";
import '../../styles/navbar.css'
import {useTopics} from "../../stores/TopicStore";
import {useGlobalStore} from "../../stores/GlobalStore";
import {ContentMobile} from "./ContentMobile";
import {ContentDesktop} from "./ContentDesktop";


export const NavBar = () => {
    const {loginValid} = useAuth();
    const {topics} = useTopics();

    const {showNav, toggleNav, mobileView} = useGlobalStore();

    if (!loginValid) {
        return;
    }

    const checkTopics = () => {
        return topics.length !== 0;
    };

    const retTopics = () => {
        if (checkTopics()) {
            return (
                <>
                    {topics.map((item, i) =>
                        <NavLink key={i}
                                 to={`/topic/${item.titleParam}`}
                                 onClick={toggleNav}>
                            {item.titleMod}
                        </NavLink>)}
                </>
            );
        } else {
            return (
                <a>No topics</a>
            )
        }
    };


    return (
        <>
            <div className={`topnav ${showNav ? "responsive" : ""}`} id="myTopnav">
                {mobileView
                ? <ContentMobile returnTopics={retTopics}/>
                : <ContentDesktop returnTopics={retTopics}/>
                }
            </div>
            <Outlet/>
        </>
    );
};
