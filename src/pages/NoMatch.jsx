import '../styles/user.css'
export const NoMatch = () => {
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