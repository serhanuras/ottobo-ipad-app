import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import '../App.css';


const Bottom = props => {
    return (
        <Container fluid className="bottom">
            {props.type === 'orderPage' ?
                <div>
                    <Row>
                        <Col>

                            <Button variant="info" size="lg" block className="button" onClick={() => props.onClick('scan')}>
                                SCAN BARCODE
                    </Button>
                        </Col>
                    </Row>
                </div> :
                <div>


                    <Row>
                        <Col>
                            {props.isRobotWalking ?
                                <Button variant="warning" size="lg" block className="button" onClick={props.onClick}>
                                    STOP ROBOT
                             </Button>
                                :
                                <Button variant="danger" size="lg" block className="button" onClick={props.onClick}>
                                    RESUME TASK
                             </Button>
                            }
                        </Col>
                    </Row>

                </div>

            }
        </Container>

    );
}

export default Bottom;
