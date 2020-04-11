import React from "react";
import { Row, Col } from "react-bootstrap";
import "./completed.css";
import completedpng from '../../../assets/images/completed.png'

const CompletedPage = props => {
  return (
    <div>
      <div className="container">
        <Row>
          <Col xs={3}></Col>
          <Col xs={6}> 
          <img src={completedpng} alt="Logo" className="completed" />
          </Col>
          <Col xs={3}></Col>
        </Row>
        <Row className="label">
          <Col xs={1}></Col>
          <Col xs={10}>Completed</Col>
          <Col xs={1}></Col>
        </Row>
      </div>
    </div>
  );
};

export default CompletedPage;
