import {useEffect, useState} from "react";
import {useAuth} from "../../stores/AuthStore";
import pb from "../../utils/pocketbase";
import '../../styles/dashboard.css'
import PropTypes from 'prop-types';
import {getTodayTime, getTomorrowTime} from "../../utils/time";
import {getParams} from "../../utils/getParams";

export const AllTodosCount = (props) => {
    const {loginValid, getUserId} = useAuth();

    const [allCount, setAllCount] = useState(0);
    const [allCountError, setAllCountError] = useState(false);
    const [allCountLoading, setAllCountLoading] = useState(true);

    const [todayCount, setTodayCount] = useState(0);
    const [todayCountError, setTodayCountError] = useState(false);
    const [todayCountLoading, setTodayCountLoading] = useState(false);

    const loadAllCount = async () => {
        setAllCountError(false);
        setAllCountLoading(true);

        let res = {};
        try {
            res = await pb.collection('todo').getFullList(1000, {
                filter: `user_id="${getUserId()}" && done=false && deleted=false`,
                sort: '-created'
            });
            setAllCount(res.length);
        } catch (e) {
            setAllCountError(true);
            console.log("error while loading count: ", e);
        } finally {
            setAllCountLoading(false);
            if (props.triggerReload !== null) {
                props.setReloading(false);
            }
        }
    };

    const loadTodayCount = async () => {
        setTodayCountLoading(true);
        setTodayCountError(false);

        // get time
        let today = getTodayTime();
        let tomorrow = getTomorrowTime();

        let res = {};
        let filters = {
            doneFilter: true,
            isDone: false,
            dateFrom: today,
            dateUntil: tomorrow,
        }
        try {
            res = await pb.collection('todo').getFullList(1000, {
                filter: getParams(filters, getUserId()),
                sort: "-created"
            });

            setTodayCount(res.length);
        } catch (e) {
            setTodayCountError(true);
            console.log("error while loading today count: ", e);
        } finally {
            setTodayCountLoading(false);
            if (props.triggerReload !== null) {
                props.setReloading(false);
            }
        }
    }

    useEffect(() => {
        if (loginValid) {
            // if (props.triggerReload !== null && props.setTriggerReload !== null) {
            if (props.triggerReload !== null) {
                props.setReloading(true);
                loadAllCount();
                loadTodayCount();
            } else {
                loadAllCount();
                loadTodayCount();
            }
        }
    }, [loginValid, props.triggerReload])

    return (
        <div className="item-c dash-box">
            <div className="todoCountContainer">
                <div>
                    <a className="">All:</a>
                    <div className="cash-font-md gradient-font" data-target="1194.09">
                        {allCount}
                    </div>
                </div>
                <div>
                    <a className="">Today:</a>
                    <div className="cash-font-md gradient-font" data-target="1194.09">
                        {todayCount}
                    </div>
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