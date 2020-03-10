import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import '../App.css';
import { GiPaperTray } from 'react-icons/gi';


function Order() {
    return (
        <Row className="order">
            
            <Col className="numbers">
                <Row>
                    <Col > Quantity </Col>
                </Row>
                <Row  style={{marginTop:"20px"}}>
                    <Col> 
                        <Row>
                            <Col className="quantity">
                                3
                            </Col>
                            <Col style={{textAlign:"left"}}>
                                <Button variant="primary" className="quantitybutton">+</Button> <br/>
                                <Button variant="primary" className="quantitybutton">-</Button>
                            </Col>
                        </Row>
                        <Row style={{marginTop:"40px"}}>
                            <Col > Picked </Col>
                        </Row>
                        <Row>
                            <Col style={{fontSize:"40px", fontWeight:"600"}}>
                               0
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col xs={6} style={{ height: "100%" }}>
                <div className="productImage" style={{backgroundImage: "url('https://productimages.hepsiburada.net/s/25/551/10120914501682.jpg')"}}>  </div>
            </Col>
            <Col  className="cart">
                <Row style={{paddingTop:"2px"}}>
                    <Col>
                        <div className="item">
                        <GiPaperTray/>
                            <span className="itemLabel">1</span>
                        </div>
                    </Col>
                </Row>
                <Row style={{paddingTop:"2px", color:"white"}}>
                    <Col>
                        <div className="item" style={{backgroundColor:"#007bff"}}>
                        <GiPaperTray/>
                            <span className="itemLabel">2</span>
                        </div>
                    </Col>
                </Row>
                <Row style={{paddingTop:"2px"}}>
                    <Col>
                        <div className="item">
                        <GiPaperTray/>
                            <span className="itemLabel">3</span>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>

    );
}

export default Order;
