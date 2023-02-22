import '../../styles/user.css'

export const ConfirmMailPage = () => {
    return (
        <>
            <div className={"staticAbsoluteContainer"}>
                <div className={"staticContainer"}>
                    <div className={"staticHeading"}>
                        Thanks for signing up!
                    </div>
                    <div className={"staticBody"}>
                        Please your registered email for verification
                    </div>
                    <div className={"staticLabel"}>
                        (Please check your spam or junk mail folder)
                    </div>
                </div>
            </div>
        </>
    );
};