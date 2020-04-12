import * as actionTypes from './action-types';
import axios from "axios";
import * as config from "../../config";



export const toogle_loading = () => {
    return {
        type: actionTypes.TOGGLE_LOADING,
    };
};

export const goto_next_order = () => {
    return (dispatch, getState) => {

        dispatch((() => {
            return {
                type: actionTypes.TOGGLE_LOADING,
            };
        })());


        dispatch((() => {

            const oldState = getState().orderPickingState;

            console.log({
                type: actionTypes.GOTO_NEXT_ORDER,
                newState: {
                    loading: false,
                    currentOrderIndex: oldState.currentOrderIndex + 1
                }
            }
            )

            return {
                type: actionTypes.GOTO_NEXT_ORDER,
                newState: {
                    loading: false,
                    currentOrderIndex: oldState.currentOrderIndex + 1
                }
            }
        })());

    }
};


export const toggle_robot_walking_state = () => {
    return {
        type: actionTypes.TOGGLE_ROBOT_WALKING_STATE,
    };
};


export const goto_next_destination = () => {
    return (dispatch, getState) => {


        const currenState = getState().orderPickingState;

        dispatch((() => {
            return {
                type: actionTypes.SET_INITIAL_STATE,
            };
        })());

        axios
            .post(`${config.getServerURL()}/get-location`, {
                prev_location_id: currenState.location
            })
            .then(res => {
                if (res.data.location !== "{ENDED}") {

                    dispatch((() => {

                        return {
                            type: actionTypes.GOTO_NEXT_DESTINATION,
                            newState: {
                                loading: false,
                                location: res.data.location
                            }
                        }
                    })());
                }
                else {
                    dispatch((() => {

                        return {
                            type: actionTypes.GOTO_NEXT_DESTINATION,
                            newState: {
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
                        }
                    })());
                }
            })
            .catch(err => {
                alert(`Error has occured. REF:[${err}]`);
            });
    }
};



export const get_order_details = () => {
    return (dispatch, getState) => {

        const currenState = getState().orderPickingState;

        axios
            .post(`${config.getServerURL()}/orders`, {
                location_id: currenState.location
            })
            .then(res => {
                const orders = res.data;
                const activeBaskets = [];

                orders.forEach(order => {
                    activeBaskets.push(order.basketId);
                });

                dispatch((() => {

                    return {
                        type: actionTypes.GET_ORDER_DETAILS,
                        newState: {
                            loading: false,
                            orders: res.data,
                            activeBaskets: activeBaskets
                        }
                    }
                })());
            })
            .catch(err => {
                alert(`Error has occured. REF:[${err}]`);
            });
    }
};


export const robot_arrived_destination = () => {
    return {
        type: actionTypes.ROBOT_ARRIVED_DESTINATION,
    };
};
