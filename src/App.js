import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Header from './Components/Header';
import Bottom from './Components/Bottom';
import Order from './Components/Order';
import { Helmet } from "react-helmet";
import GoogleFontLoader from 'react-google-font-loader';

class App extends Component {

  constructor(){
    super();
    this.state = {
      showScanner: false
    }
  }

  onScannedButtonClick =()=>{
    this.setState({
      showScanner : true
    })

  }

  onConfirmedButtonClick = () =>{
    this.setState({
      showScanner : false
    })
  }

  render() {

    return (
      <div className="App" style={{ fontFamily: 'Roboto'}}>
        <GoogleFontLoader
          fonts={[
            {
              font: 'Roboto',
              weights: [400, '400i'],
            },
            {
              font: 'Roboto Mono',
              weights: [400, 700],
            },
          ]}
          subsets={['cyrillic-ext', 'greek']}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Ottobo</title>
          <meta http-equiv="ScreenOrientation" content="autoRotate:disabled"></meta>
        </Helmet>
        <Container fluid>

          <Header />

          <Order showScanner={this.state.showScanner}/>

          <Bottom  onScannedButtonClick={this.onScannedButtonClick} onConfirmedButtonClick={this.onConfirmedButtonClick}/>

        </Container>
      </div>
    );
  }
}

export default App;
