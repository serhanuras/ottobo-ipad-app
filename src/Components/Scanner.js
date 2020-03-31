import React,{ Component} from 'react';
import Quagga from 'quagga';

// "code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader","code_39_vin_reader","codabar_reader","upc_reader","upc_e_reader","i2of5_reader","2of5_reader","code_93_reader"
class Scanner extends Component {
   
    render() {
        return (
            <div id="interactive" className="viewport"/>
        );
    }

    componentDidMount() {
      
        Quagga.init({
            inputStream: {
                name: "Live",
                type : "LiveStream",
                constraints: {
                    width: this.props.width,
                    height: this.props.height,
                    facingMode: "environment", // or user
                },
                area: { // defines rectangle of the detection/localization area
                    top: "0%",    // top offset
                    right: "0%",  // right offset
                    left: "0%",   // left offset
                    bottom: "0%"  // bottom offset
                  },
                  singleChannel: false
            },
            locator: {
                patchSize: "medium",
                halfSample: true,
                debug: {
                    drawBoundingBox: true,
                    showFrequency: true,
                    drawScanline: true,
                    showPattern: true
                },
            },
            numOfWorkers: 4,
            decoder: {
                readers: ["ean_reader", "ean_8_reader"]
            },
            frequency: 10,
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(this.props.onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this.props.onDetected);
        Quagga.stop();
    }
};

export default Scanner;