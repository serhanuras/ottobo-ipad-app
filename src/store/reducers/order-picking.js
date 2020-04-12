import * as actionTypes from '../actions/action-types';
import { updateObject } from '../utility';

const getUrlParameter = name => {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};


let isBarcodeControlWorking = true;

if (getUrlParameter("env") === "test") {
    isBarcodeControlWorking = false;
}

const initialState = {
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

const reducer = (state = initialState, action) => {

    const toogle_loading = (state) => {
        return { loading: !state.loading }
    }

    const toogle_robot_walking_state = (state) => {
        state.isRobotWalking = !state.isRobotWalking;
    }

    const robot_arrived_destination = (state) => {
        state.loading = true;
        state.isRobotAtDestination = true;
        state.isRobotWalking = false;
    }

    console.log('REDUCER : ', action);

    switch (action.type) {
        case actionTypes.SET_INITIAL_STATE:
            return updateObject(state, initialState);
        case actionTypes.TOGGLE_LOADING:
            return updateObject(state, toogle_loading(state));
        case actionTypes.GOTO_NEXT_ORDER:
            return updateObject(state, action.newState);
        case actionTypes.TOGGLE_ROBOT_WALKING_STATE:
            return updateObject(state, toogle_robot_walking_state(state));
        case actionTypes.GOTO_NEXT_DESTINATION:
            return updateObject(state, action.newState);
        case actionTypes.GET_ORDER_DETAILS:
            return updateObject(state, action.newState);
        case actionTypes.ROBOT_ARRIVED_DESTINATION:
            return updateObject(state, robot_arrived_destination(state));
        default:
            return state;

    }
};




export default reducer;