import '../styles/user.css'
import {useGlobalStore} from "../stores/GlobalStore";
export const NoMatch = () => {
    const {setTabName} = useGlobalStore();
    setTabName("Not found!");
    return (
        <>
            <div className={"staticAbsoluteContainer"}>
                <div className={"staticContainer"}>
                    <div className={"staticHeading"}>
                        Page not found
                    </div>
                    <div className={"staticBody"}>
                        Please check the requested URL
                    </div>
                </div>
            </div>
        </>
    );
};