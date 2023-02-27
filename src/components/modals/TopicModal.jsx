import PropTypes from 'prop-types';
export const TopicModal = (props) => {

    return (
        <>
            <Modal
                open={props.show}
                onClose={() => {
                    handleExit()
                }}
                className="modal"
            >

            </Modal>


        </>
    );
};