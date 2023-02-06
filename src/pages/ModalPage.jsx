import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import {render} from "@testing-library/react";
import Form from 'react-bootstrap/Form';
import TimePicker from 'react-bootstrap-time-picker';
import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";



function MydModalWithGrid(props) {
    const [date, setDate] = useState(new Date());
    return (
        <div className="modalBackground">
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="my-modal" >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Todo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Col xs={12} md={8}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className="">Topic</Form.Label>
                                <Form.Control
                                    className="modalText"
                                    type="text"
                                    placeholder="Topic"
                                    autoFocus
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={4}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="datepic"
                                    className="dateInput"
                                    placeholder="DateRange"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    />

                        </Form.Group>
                            <TimePicker className="" start="10:00" end="21:00" step={30} />
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6} md={4}>
                            .col-xs-6 .col-md-4
                        </Col>
                        <Col xs={6} md={4}>
                            .col-xs-6 .col-md-4
                        </Col>
                        <Col xs={6} md={4}>
                            .col-xs-6 .col-md-4
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
}
export const ModalPage = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Fab size="medium" color="primary" aria-label="add" className="addIcon" onClick={() => setModalShow(true)} >
                <AddIcon />
            </Fab>

            <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
}

    render(<ModalPage />);