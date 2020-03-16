import React from 'react';
import { Navbar, Button, Row, Col, Container } from 'react-bootstrap';
import '../App.css';


const Bottom  = props =>{
    return (
        <Container fluid className="bottom">
            <Row>
                <Col>

                    <Button variant="info" size="lg" block className="button" onClick={props.onScannedButtonClick}>
                        SCAN BARCODE
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="success" size="lg" block className="button" onClick={props.onConfirmedButtonClick}>
                        CONFIRM PICKING
             </Button>
                </Col>
            </Row>
        </Container>


    );
}

export default Bottom;
