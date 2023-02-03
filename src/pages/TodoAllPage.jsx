import {TodoPage} from "./TodoPage";
import {useAuth} from "../stores/AuthStore";
import {Suspense, useEffect} from "react";

export const TodoAllPage = () => {

    return (
        <>
            <TodoPage scrollable={true} />
        </>
    );
};