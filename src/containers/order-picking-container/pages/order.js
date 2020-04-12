import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Row, Col, Button, Alert, Modal } from "react-bootstrap";
import { GiPaperTray } from "react-icons/gi";
import { FaBarcode } from "react-icons/fa";
import Scanner from "../../../components/scanner";
import Bottom from "../../../components/bottom";
import "./order.css";
import * as actionCreators from '../../../store/actions/index';

const Order = props => {
  console.log("arra", props.orderPickingState.activeBaskets);

  const getOrder = () => {
    return props.orderPickingState.orders[props.orderPickingState.currentOrderIndex]
  }

  const [customState, setCustomState] = useState({
    quantity: getOrder().quantity,
    picked: 0,
    error: null,
    showConfirmationModal: false,
    showScanner: false,
    isConfimButtonDisabled: true
  });

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);


  const onToggleScanner = type => {

    console.log(type);
    if (type === "scan") {

      customState.showScanner = !customState.showScanner

      setCustomState({
        ...customState
      });
    }
  };

  let isBarcodeScanned = false;
  const _onDetected = result => {
    console.log(result);
    if (isBarcodeScanned === false) {
      isBarcodeScanned = true;

      console.log(result.codeResult.code);

      if (
        getOrder().barcode === result.codeResult.code ||
        props.orderPickingState.isBarcodeControlWorking === false
      ) {
        customState.picked = ++customState.picked;

        if (customState.picked === customState.quantity) {
          if (
            getOrder().basketId ===
            props.orderPickingState.activeBaskets[props.orderPickingState.activeBaskets.length - 1]
          ) {
            customState.showConfirmationModal = true;

            setCustomState({
              ...customState
            });
          } else {
            props.onGotoNextOrder();
          }
        } else {
          setCustomState({
            ...customState
          });

          setInterval(() => {
            isBarcodeScanned = false;
          }, 2500);
        }
      } else {
        customState.error = {
          title: "Invalid Barcode Code",
          description: "Scanned product's barcode does match with requested product's barcode number !"
        };

        setCustomState({
          ...customState
        });

        setInterval(() => {
          isBarcodeScanned = false;
        }, 1000);
      }
    }
  };

  const updatePicked = type => {
    if (type === "+") {
      customState.picked = customState.picked + 1;
      setCustomState({
        ...customState
      });
    } else {
      if (customState.picked > 0) {
        customState.picked = customState.picked - 1;
        setCustomState({
          ...customState
        });
      }
    }
  };

  const handleErrorModelClose = () => {
    customState.error = null;
    setCustomState({
      ...customState
    });
  };

  const confirmPicking = () => {
    props.onGoToNextDestination();
  };

  let { innerWidth: width, innerHeight: height } = window;

  if (width === 1024) {
    width = 480;
    height = 320;
  } else {
    width = 360;
    height = 240;
  }

  let middleJsx = (
    <div
      className="productImage"
      style={{ backgroundImage: `url('${getOrder().imageUrl}')` }}
    >
      {" "}
    </div>
  );
  if (customState.showScanner) {
    middleJsx = (
      <div>
        <Scanner
          onDetected={result => _onDetected(result)}
          width={width}
          height={height}
          style={{ textAlign: "center" }}
        />
        <FaBarcode className="barcode" />
      </div>
    );
  }

  return (
    <div className="order">
      <Row>
        <Col className="numbers">
          <Row>
            <Col> QUANTITY </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <Row>
                <Col style={{ fontSize: "40px", fontWeight: "600" }}>
                  {customState.quantity}
                </Col>
              </Row>
              <Row style={{ marginTop: "40px" }}>
                <Col> PICKED </Col>
              </Row>
              <Row>
                <Col className="picked">{customState.picked}</Col>
                <Col style={{ textAlign: "left" }}>
                  <Button
                    variant="primary"
                    className="pickedbutton"
                    onClick={() => updatePicked("+")}
                  >
                    +
                  </Button>{" "}
                  <br />
                  <Button
                    variant="primary"
                    className="pickedbutton"
                    onClick={() => updatePicked("-")}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={6} style={{ height: "100%" }}>
          {middleJsx}
        </Col>
        <Col className="cart">
          {props.orderPickingState.activeBaskets.includes(1) ? (
            <Row
              style={
                getOrder().basketId === 1
                  ? { paddingTop: "2px", color: "white" }
                  : { paddingTop: "2px" }
              }
            >
              <Col>
                <div
                  className="item"
                  style={
                    getOrder().basketId === 1
                      ? { backgroundColor: "#007bff" }
                      : {}
                  }
                >
                  <GiPaperTray />
                  <span className="itemLabel">1</span>
                </div>
              </Col>
            </Row>
          ) : null}
          {props.orderPickingState.activeBaskets.includes(2) ? (
            <Row
              style={
                getOrder().basketId === 2
                  ? { paddingTop: "2px", color: "white" }
                  : { paddingTop: "2px" }
              }
            >
              <Col>
                <div
                  className="item"
                  style={
                    getOrder().basketId === 2
                      ? { backgroundColor: "#007bff" }
                      : {}
                  }
                >
                  <GiPaperTray />
                  <span className="itemLabel">2</span>
                </div>
              </Col>
            </Row>
          ) : null}
          {props.orderPickingState.activeBaskets.includes(3) ? (
            <Row
              style={
                getOrder().basketId === 3
                  ? { paddingTop: "2px", color: "white" }
                  : { paddingTop: "2px" }
              }
            >
              <Col>
                <div
                  className="item"
                  style={
                    getOrder().basketId === 3
                      ? { backgroundColor: "#007bff" }
                      : {}
                  }
                >
                  <GiPaperTray />
                  <span className="itemLabel">3</span>
                </div>
              </Col>
            </Row>
          ) : null}
        </Col>
      </Row>
      <Row className="title">
        <Col>{getOrder().orderName}</Col>
      </Row>


      <Row className="position">
        <Col> </Col>
        <Col xs={6}>
          <Alert variant="primary">{props.orderPickingState.location}</Alert>
        </Col>
        <Col> </Col>
      </Row>


      <Bottom
        onClick={onToggleScanner}
        type="orderPage"
        isConfimButtonActive={customState.isConfimButtonDisabled}

      />
      {customState.error !== null ? (
        <Modal
          show={customState.error !== null}
          onHide={handleErrorModelClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="model"
        >
          <Modal.Header closeButton>
            <Modal.Title className="title">
              {customState.error.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="body">
            {customState.error.description}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={handleErrorModelClose}
              className="button"
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
          customState.error !== null
        )}

      {customState.showConfirmationModal ? (
        <Modal
          show={true}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="model"
        >
          <Modal.Header closeButton>
            <Modal.Title className="title">
              Confirm to go next destination
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="body">
            Picking packages of this destination have been completed.
            <br /><br />Confirm to go next destination ?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              size="lg"
              onClick={confirmPicking}
              className="button"
            >
              CONFIRM PICKING
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </div>
  );
};



const mapStateToProps = state => {
  return {

    orderPickingState: state.orderPickingState,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onToogleLoading: () => dispatch(actionCreators.toogle_loading()),
    onGotoNextOrder: () => dispatch(actionCreators.goto_next_order()),
    onToggleRobotWalkingState: () => dispatch(actionCreators.toggle_robot_walking_state()),
    onGoToNextDestination: () => dispatch(actionCreators.goto_next_destination()),
    onGetOrderDetails: () => dispatch(actionCreators.get_order_details()),
    onRobotArrivedDestination: () => dispatch(actionCreators.robot_arrived_destination()),


  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Order)
