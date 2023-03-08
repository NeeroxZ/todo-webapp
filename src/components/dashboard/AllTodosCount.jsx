import {useEffect, useState} from "react";
import {useAuth} from "../../stores/AuthStore";
import pb from "../../utils/pocketbase";
import PropTypes from 'prop-types';

export const AllTodosCount = (props) => {
    const {loginValid, getUserId} = useAuth();

    const [count, setCount] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadCount = async () => {
        setError(false);
        setLoading(true);

        let res = {};
        try {
            res = await pb.collection('todo').getFullList(1000, {
                filter: `user_id="${getUserId()}" && done=false && deleted=false`,
                sort: '-created'
            });
            setCount(res.length);
        } catch (e) {
            setError(true);
            console.log("error while loading count: ", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loginValid) {
            // if (props.triggerReload !== null && props.setTriggerReload !== null) {
            if (props.triggerReload !== null) {
                props.setReloading(true);
                loadCount();
                props.setReloading(false);
            } else {
                loadCount();
            }
        }
    }, [loginValid, props.triggerReload])

    return (
        <div className="item-c dash-box">
            <div>
                <a className="">All ToDo`s:</a>
                <div className="cash-font-md gradient-font" data-target="1194.09">
                    {count}
                </div>
            </div>
        </div>
    );
}

AllTodosCount.propTypes = {
    triggerReload: PropTypes.bool,
    // setTriggerReload: PropTypes.func,

    reloading: PropTypes.bool,
    setReloading: PropTypes.func,
}