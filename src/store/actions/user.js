import * as actionTypes from './action-types';
import axios from "axios";
import * as config from "../../config";



export const get_user_details = () => {
    return (dispatch, getState) => {

        dispatch((() => {
            return {
                type: actionTypes.LOGON,
            };
        })());

    }
};
