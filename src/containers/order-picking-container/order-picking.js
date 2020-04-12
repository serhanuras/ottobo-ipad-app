import React, { Component } from "react";
import { connect } from 'react-redux';
import Routing from "./pages/routing";
import Completed from "./pages/completed";
import Loader from "../../components/loader";
import Hoc from '../../components/hoc';
import * as actionCreators from '../../store/actions/index';
import "./order-picking.css";
import Order from "./pages/order";

class OrderPicking extends Component {


  componentDidMount() {
    //this.gotoNextDestination();

    this.props.onGoToNextDestination();
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdated...", this.props.orderPickingState);

    if (
      this.props.orderPickingState.loading === false &&
      this.props.orderPickingState.isRobotWalking === true &&
      this.props.orderPickingState.isCompleted === false
    ) {
      this.robotWalkingtInterval =
        setTimeout(() => {
          this.props.onRobotArrivedDestination();
        }, 3000);

    } 
    
    // else if (
    //   this.props.orderPickingState.loading === true &&
    //   this.props.orderPickingState.isRobotAtDestination === true &&
    //   this.props.orderPickingState.isCompleted === false
    // ) {
    //   if(this.props.orderPickingState.currentOrderIndex==0)
    //     this.props.onGetOrderDetails();
    // }
  }

  toggleRobotWalking=()=>{

    if(this.props.orderPickingState.isRobotWalking){
      clearInterval(this.robotWalkingtInterval);
    }
    else{
      this.robotWalkingtInterval =
        setTimeout(() => {
          this.props.onRobotArrivedDestination();
        }, 3000);
    }

    this.props.onToggleRobotWalkingState();
  }

  render() {
    let { innerWidth: width } = window;

    if (width === 1024) {
      width = 550;
    } else {
      width = 400;
    }

    return (
      <Hoc>
        {this.props.orderPickingState.loading ? (
          <Loader height="60px" width="15px" marginTop={width + "px"} />
        ) : (
            <div>
              {this.props.orderPickingState.isCompleted ? (
                <Completed />
              ) : (
                  <div>
                    {this.props.orderPickingState.isRobotAtDestination ? (
                      <Order/>
                    ) : (
                        <Routing
                          onClick={this.toggleRobotWalking}
                          isRobotWalking={this.props.orderPickingState.isRobotWalking}
                          location={this.props.orderPickingState.location}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderPicking);
