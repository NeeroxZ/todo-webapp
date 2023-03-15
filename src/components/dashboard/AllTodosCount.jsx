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
    const [todayCount, setTodayCount] = useState(0);

    const [isLoadingAllCount, setIsLoadingAllCount] = useState(true);
    const [isLoadingTodayCount, setIsLoadingTodayCount] = useState(true);


    useEffect(() => {
        if (!isLoadingAllCount && !isLoadingTodayCount) {
            props.setReloading(false);
        }
    }, [isLoadingAllCount, isLoadingTodayCount])

    const loadAllCount = async () => {
        setIsLoadingAllCount(true);
        let res = {};
        try {
            res = await pb.collection('todo').getFullList(1000, {
                filter: `user_id="${getUserId()}" && done=false && deleted=false`,
                sort: '-created'
            });
            setAllCount(res.length);
        } catch (e) {
            console.log("error while loading count: ", e);
        } finally {
            if (props.triggerReload !== null) {
                setIsLoadingAllCount(false);
                // props.setReloading(false);
            }
        }
    };

    const loadTodayCount = async () => {
        setIsLoadingTodayCount(true);

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
            console.log("error while loading today count: ", e);
        } finally {
            if (props.triggerReload !== null) {
                setIsLoadingTodayCount(false);
                // props.setReloading(false);
            }
        }
    }

    useEffect(() => {
        if (loginValid) {
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

    reloading: PropTypes.bool,
    setReloading: PropTypes.func,
}