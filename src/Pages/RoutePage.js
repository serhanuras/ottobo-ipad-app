import React from "react";
import { Row, Col } from "react-bootstrap";
import Bottom from "../Components/Bottom";
import "./RoutePage.css";

const RoutePage = props => {
  return (
    <div>
      <div className="container">
        <Row className="title">
          <Col xs={3}></Col>
          <Col xs={6}> Next Location</Col>
          <Col xs={3}></Col>
        </Row>
        <Row className="label">
          <Col xs={1}></Col>
          <Col xs={10}> {props.location}</Col>
          <Col xs={1}></Col>
        </Row>
      </div>

      <Bottom
        onClick={() => props.onClick()}
        type="routePage"
        isRobotWalking={props.isRobotWalking}
      />
    </div>
  );
};

export default RoutePage;
