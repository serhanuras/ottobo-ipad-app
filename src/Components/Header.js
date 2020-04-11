import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Navbar } from 'react-bootstrap';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import logo from '../assets/images/ottobo.png'
import './header.css';

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
                    <Link to="/users">
                        <div> <FaRegUserCircle /></div>
                        <div>Mustafa Serhan Uras</div>
                    </Link>
                </Col>
            </Row>
        </Navbar>
    );
}

export default React.memo(Header);
