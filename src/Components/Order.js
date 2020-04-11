import React, { useState, useEffect } from "react";
import { Row, Col, Button, Alert, Modal } from "react-bootstrap";
import { GiPaperTray } from "react-icons/gi";
import { FaBarcode } from "react-icons/fa";
import Scanner from "./scanner";
import "./order.css";

const Order = props => {
  console.log("arra", props.activeBaskets);
  const [customState, setCustomState] = useState({
    quantity: props.order.quantity,
    picked: 0,
    error: null,
    showConfirmationModal: false
  });

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  let isBarcodeScanned = false;
  const _onDetected = result => {
    console.log(result);
    if (isBarcodeScanned === false) {
      isBarcodeScanned = true;

      console.log(result.codeResult.code);

      if (
        props.order.barcode === result.codeResult.code ||
        props.isBarcodeControlWorking === false
      ) {
        customState.picked = ++customState.picked;

        if (customState.picked === customState.quantity) {
          if (
            props.order.basketId ===
            props.activeBaskets[props.activeBaskets.length - 1]
          ) {
            customState.showConfirmationModal = true;

            setCustomState({
              ...customState
            });
          } else {
            props.nextOrder();
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

  const updateQuantity = type => {
    if (type === "+") {
      customState.quantity = customState.quantity + 1;
      setCustomState({
        ...customState
      });
    } else {
      if (customState.quantity > 1) {
        customState.quantity = customState.quantity - 1;
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
    props.gotoNextDestination();
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
      style={{ backgroundImage: `url('${props.order.imageUrl}')` }}
    >
      {" "}
    </div>
  );
  if (props.showScanner) {
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
                <Col className="quantity">{customState.quantity}</Col>
                <Col style={{ textAlign: "left" }}>
                  <Button
                    variant="primary"
                    className="quantitybutton"
                    onClick={() => updateQuantity("+")}
                  >
                    +
                  </Button>{" "}
                  <br />
                  <Button
                    variant="primary"
                    className="quantitybutton"
                    onClick={() => updateQuantity("-")}
                  >
                    -
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginTop: "40px" }}>
                <Col> PICKED </Col>
              </Row>
              <Row>
                <Col style={{ fontSize: "40px", fontWeight: "600" }}>
                  {customState.picked}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={6} style={{ height: "100%" }}>
          {middleJsx}
        </Col>
        <Col className="cart">
          {props.activeBaskets.includes(1) ? (
            <Row
              style={
                props.order.basketId === 1
                  ? { paddingTop: "2px", color: "white" }
                  : { paddingTop: "2px" }
              }
            >
              <Col>
                <div
                  className="item"
                  style={
                    props.order.basketId === 1
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
          {props.activeBaskets.includes(2) ? (
            <Row
              style={
                props.order.basketId === 2
                  ? { paddingTop: "2px", color: "white" }
                  : { paddingTop: "2px" }
              }
            >
              <Col>
                <div
                  className="item"
                  style={
                    props.order.basketId === 2
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
          {props.activeBaskets.includes(3) ? (
            <Row
              style={
                props.order.basketId === 3
                  ? { paddingTop: "2px", color: "white" }
                  : { paddingTop: "2px" }
              }
            >
              <Col>
                <div
                  className="item"
                  style={
                    props.order.basketId === 3
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
        <Col>{props.order.orderName}</Col>
      </Row>

      <Row className="position">
        <Col> </Col>
        <Col xs={6}>
          <Alert variant="primary">{props.location}</Alert>
        </Col>
        <Col> </Col>
      </Row>

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
            <Modal.Title  className="title">
              Confirm to go next destination
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="body">
            Picking packages of this destination have been completed. 
            <br/><br/>Confirm to go next destination ?
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

export default React.memo(Order);
