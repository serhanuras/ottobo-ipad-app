import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { Row, Col, Navbar } from 'react-bootstrap';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import logo from '../assets/images/ottobo.png'
import './header.css';

function Header(props) {


    let width = 0;
    let valueNow = 0;
    if(props.orderPickingState.visitedDestionationCount>1)
    {
        width = (props.orderPickingState.visitedDestionationCount-1) / props.orderPickingState.totalDestionationNumber * 100;
    }

    if(props.orderPickingState.visitedDestionationCount>2)
    {
        valueNow = (props.orderPickingState.visitedDestionationCount-2) / props.orderPickingState.totalDestionationNumber * 100;
    }
   

    return (
        <Navbar fixed="top" className="navbar" >
            <Row className="Header-row">
                <Col className="col1" style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                    <Row>
                        <Col className="monitor">
                            <FiMonitor />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="progress" >

                                <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow={valueNow} aria-valuemin="0" aria-valuemax="100" style={{ width: width + "%" }}>
                                    {width}%
                         </div>
                            </div>
                        </Col>
                    </Row>

                </Col>
                <Col xs={5}>
                    <div className="col2">
                        <img src={logo} alt="Logo" className="logo" />
                    </div>
                </Col>
                <Col className="col3">
                    <Link to="/users">
                        <div> <FaRegUserCircle /></div>
                        <div>{props.userState.user.name} {props.userState.user.surname}</div>
                    </Link>
                </Col>
            </Row>
        </Navbar>
    );
}


const mapStateToProps = state => {
    return {

        userState: state.userState,
        orderPickingState: state.orderPickingState,
    }
};


export default connect(mapStateToProps)(Header);

