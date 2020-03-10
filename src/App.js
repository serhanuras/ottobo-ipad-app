import React, { Component } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import './App.css';
import Header from './Components/Header';
import Bottom from './Components/Bottom';
import Order from './Components/Order';
import { Helmet } from "react-helmet";
import { FaBarcode } from 'react-icons/fa';
import { AiOutlineBarcode } from 'react-icons/ai';
import Scanner from './Components/Scanner';

class App extends Component {

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

    console.log('AAA', width, height);
    return (
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Ottobo</title>
          <meta http-equiv="ScreenOrientation" content="autoRotate:disabled"></meta>
        </Helmet>
        <Container fluid>

          <Header />

          <Order />

          <Row >
            <Col> </Col>
            <Col xs={6}>
              <Alert variant="primary" style={{ fontSize: "25px", fontWeight: "600" }}>
                <FaBarcode style={{ fontSize: "40px", marginRight: "15px" }} /> 2A - 003 - 167
          </Alert>
            </Col>
            <Col> </Col>
          </Row>
          <Row style={{ paddingTop: "50px", height: height }}>
            <Col> </Col>
            <Col xs={6}>

              <Scanner onDetected={this._onDetected} width={width} height={height} style={{ textAlign: "center" }} />

            </Col>
            <Col> </Col>
          </Row>
          <Row style={{ paddingTop: "50px", height: height }}>
            <Col> </Col>
            <Col xs={6}>
              <FaBarcode style={{ fontSize: height/4 }} />
            </Col>
            <Col> </Col>
          </Row>
          <Bottom />

        </Container>
      </div>
    );
  }
}

export default App;
