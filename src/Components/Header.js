import React from 'react';
import { Row, Col, Navbar } from 'react-bootstrap';
import '../App.css';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import logo from '../Images/ottobo.png'

function Header() {
    return (
        <Navbar fixed="top" style={{ width: "100%", padding: "0px", margin: '0px', backgroundColor: "#f7f7f7" }} >
        <Row className="Header-row">
            <Col className="col1">
                <FiMonitor />
            </Col>
            <Col xs={5}>
                <div className="col2">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
            </Col>
            <Col className="col3">
                <div> <FaRegUserCircle/></div>
                <div>Mustafa Serhan Uras</div>
            </Col>
        </Row>
        </Navbar>
    );
}

export default Header;
