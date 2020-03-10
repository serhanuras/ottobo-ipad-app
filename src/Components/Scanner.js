import React,{ Component} from 'react';
import Quagga from 'quagga';

class Scanner extends Component {
   
    render() {
        return (
            <div id="interactive" className="viewport"/>
        );
    }

    componentDidMount() {
        console.log(this.props.width)
        console.log(this.props.height)
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: this.props.width,
                    height: this.props.height,
                    facing: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 4,
            decoder: {
                readers : [ "code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader","code_39_vin_reader","codabar_reader","upc_reader","upc_e_reader","i2of5_reader","2of5_reader","code_93_reader"]
            },
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
    }

    // _onDetected(result) {
    //     //console.log(result);
    //     console.log(this.props)
        
    // }
};

export default Scanner;