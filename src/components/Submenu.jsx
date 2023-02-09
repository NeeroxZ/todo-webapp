import {useEffect, useState} from "react";

export const Submenu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="dropdown nav_item">
                <button className="dropbtn">Topics</button>
                <div className="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>

        </>
    );
};