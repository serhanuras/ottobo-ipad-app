import * as actionTypes from '../actions/action-types';
import { updateObject } from '../utility';


const initialState = {
    user: {
        id: "9903ED01-A73C-4874-8ABF-D2678E3AE23D",
        name: "Mustafa Serhan",
        surname: "Uras"
    },
    sessionId: "9903ED01-A73C-4874-8ABF-D2678E3AE23D"
}


const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGON:
            return updateObject(state, initialState.user);
        default:
            return state;

    }

}

export default reducer;