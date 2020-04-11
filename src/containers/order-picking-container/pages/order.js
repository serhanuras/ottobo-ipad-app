import React, { Component } from "react";
import Bottom from "../../../components/bottom";
import Order from "../../../components/order";

class OrderPage extends Component {
  constructor() {
    super();
    this.state = {
      showScanner: false,
      isConfimButtonDisabled: true
    };
  }

  onClick = type => {
    if (type === "scan") {
      this.setState({
        showScanner: !this.state.showScanner
      });
    }
  };


  render() {
    return (
      <div>
        <Order
          showScanner={this.state.showScanner}
          order={this.props.order}
          location={this.props.location}
          nextOrder={this.props.nextOrder}
          activeBaskets={this.props.activeBaskets}
          isBarcodeControlWorking ={this.props.isBarcodeControlWorking}
          gotoNextDestination = {this.props.gotoNextDestination}
        />
        <Bottom
          onClick={this.onClick}
          type="orderPage"
          isConfimButtonActive={this.state.isConfimButtonDisabled}
          
        />
      </div>
    );
  }
}

export default OrderPage;
