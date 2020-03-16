import React, { Component } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import '../App.css';
import { GiPaperTray } from 'react-icons/gi';
import { FaBarcode } from 'react-icons/fa';
import { AiOutlineBarcode } from 'react-icons/ai';
import Scanner from '../Components/Scanner';

class Order extends Component {

    _onDetected = (result) => {
        console.log(result);
    }

    

    render() {
        let { innerWidth: width, innerHeight: height } = window;

        if (width === 1024) {
            width = 480;
            height = 320;
        }
        else {
            width = 360;
            height = 240;
        }

        let middleJsx = <div className="productImage" style={{ backgroundImage: "url('https://productimages.hepsiburada.net/s/25/551/10120914501682.jpg')" }}>  </div>;
        if(this.props.showScanner){
            middleJsx = <div>
                    <Scanner onDetected={this._onDetected} width={width} height={height} style={{ textAlign: "center" }} />
                    <FaBarcode className="barcode"/>
                    </div>;
        }

        return (
            <div className="order">
                <Row >

                    <Col className="numbers">
                        <Row>
                            <Col > QUANTITY </Col>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <Col>
                                <Row>
                                    <Col className="quantity">
                                        3
                            </Col>
                                    <Col style={{ textAlign: "left" }}>
                                        <Button variant="primary" className="quantitybutton">+</Button> <br />
                                        <Button variant="primary" className="quantitybutton">-</Button>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "40px" }}>
                                    <Col > PICKED </Col>
                                </Row>
                                <Row>
                                    <Col style={{ fontSize: "40px", fontWeight: "600" }}>
                                        0
                            </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6} style={{ height: "100%" }}>
                        {middleJsx}
                    </Col>
                    <Col className="cart">
                        <Row style={{ paddingTop: "2px" }}>
                            <Col>
                                <div className="item">
                                    <GiPaperTray />
                                    <span className="itemLabel">1</span>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "2px", color: "white" }}>
                            <Col>
                                <div className="item" style={{ backgroundColor: "#007bff" }}>
                                    <GiPaperTray />
                                    <span className="itemLabel">2</span>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{ paddingTop: "2px" }}>
                            <Col>
                                <div className="item">
                                    <GiPaperTray />
                                    <span className="itemLabel">3</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="title">
                    <Col >
                        Prima Bebek Bezi Premium Care 5
                </Col>
                </Row>

                <Row className="position">
                    <Col> </Col>
                    <Col xs={6}>
                        <Alert variant="primary" >
                            2A - 003 - 167
         </Alert>
                    </Col>
                    <Col> </Col>
                </Row>
            </div>

        );
    }
}

export default Order;
