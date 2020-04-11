import React, { Component } from "react";
import axios from "axios";
import OrderPage from "./pages/order";

import Routing from "./pages/routing";
import Completed from "./pages/completed";
import Loader from "../../components/loader";
import Hoc from '../../components/hoc';
import * as config from "../../config";
import "./order-picking.css";

class OrderPicking extends Component {
  constructor() {
    super();

    let isBarcodeControlWorking = true;

    if (this.getUrlParameter("env") === "test") {
      isBarcodeControlWorking = false;
    }

    this.state = {
      loading: true,
      location: "",
      currentOrderIndex: 0,
      orders: [],
      activeBaskets: [],
      isRobotWalking: true,
      isRobotAtDestination: false,
      robotWalkingTimeout: null,
      isCompleted: false,
      isBarcodeControlWorking: isBarcodeControlWorking
    };
  }

  getUrlParameter = name => {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  };

  nextOrderHandler = () => {
    console.log("[App.js] nextOrderHandler is called...");

    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        currentOrderIndex: this.state.currentOrderIndex + 1
      });
    }, 2000);
  };

  changeRobotWalkingState = () => {
    if (this.state.isRobotWalking) {
      console.log(this.state.isRobotWalking);
      this.setState({
        isRobotWalking: !this.state.isRobotWalking,
        robotWalkingTimeout: null
      });
      clearTimeout(this.state.robotWalkingTimeout);
    } else {
      this.setState({
        isRobotWalking: !this.state.isRobotWalking
      });
    }
  };

  componentDidMount() {
    this.gotoNextDestination();
  }

  getOrderDetails = () => {
    setTimeout(() => {
      axios
        .post(`${config.getServerURL()}/orders`, {
          location_id: this.state.location
        })
        .then(res => {
          console.log(res);

          const orders = res.data;
          const activeBaskets = [];

          orders.forEach(order => {
            console.log(1, order.basketId);
            activeBaskets.push(order.basketId);
          });

          this.setState({
            loading: false,
            orders: res.data,
            activeBaskets: activeBaskets
          });
        })
        .catch(err => {
          alert(`Error has occured. REF:[${err}]`);
        });
    }, 3000);
  };

  setWalkingTimeout = () =>
    setTimeout(() => {
      this.setState({
        loading: true,
        isRobotAtDestination: true,
        isRobotWalking: false
      });
    }, 5000);

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdated...", this.state);

    if (
      this.state.loading === false &&
      this.state.isRobotWalking === true &&
      this.state.robotWalkingTimeout === null &&
      this.state.isCompleted === false
    ) {
      this.setState({
        robotWalkingTimeout: this.setWalkingTimeout()
      });
    } else if (
      this.state.loading === true &&
      this.state.isRobotAtDestination === true &&
      this.state.isCompleted === false
    ) {
      this.getOrderDetails();
    }
  }

  gotoNextDestination = () => {
    this.setState({
      loading: true,
      currentOrderIndex: 0,
      orders: [],
      activeBaskets: [],
      isRobotWalking: true,
      isRobotAtDestination: false,
      robotWalkingTimeout: null
    });

    setTimeout(() => {
      axios
        .post(`${config.getServerURL()}/get-location`, {
          prev_location_id: this.state.location
        })
        .then(res => {
          if (res.data.location !== "{ENDED}") {
            this.setState({
              loading: false,
              location: res.data.location
            });
          }
          else {
            this.setState(
              {
                loading: false,
                location: "",
                currentOrderIndex: 0,
                orders: [],
                activeBaskets: [],
                isRobotWalking: true,
                isRobotAtDestination: false,
                robotWalkingTimeout: null,
                isCompleted: true,
                isBarcodeControlWorking: false
              }
            )
          }
        })
        .catch(err => {
          alert(`Error has occured. REF:[${err}]`);
        });
    }, 2000);
  };

  render() {
    let { innerWidth: width } = window;

    if (width === 1024) {
      width = 550;
    } else {
      width = 400;
    }

    return (
      <Hoc>
        {this.state.loading ? (
          <Loader height="60px" width="15px" marginTop={width + "px"} />
        ) : (
            <div>
              {this.state.isCompleted ? (
                <Completed />
              ) : (
                  <div>
                    {this.state.isRobotAtDestination ? (
                      <OrderPage
                        order={this.state.orders[this.state.currentOrderIndex]}
                        activeBaskets={this.state.activeBaskets}
                        location={this.state.location}
                        nextOrder={this.nextOrderHandler}
                        gotoNextDestination={this.gotoNextDestination}
                        isBarcodeControlWorking={
                          this.state.isBarcodeControlWorking
                        }
                      />
                    ) : (
                        <Routing
                          onClick={this.changeRobotWalkingState}
                          isRobotWalking={this.state.isRobotWalking}
                          location={this.state.location}
                        />
                      )}
                  </div>
                )}
            </div>
          )}
      </Hoc>
    );
  }
}

export default OrderPicking;
