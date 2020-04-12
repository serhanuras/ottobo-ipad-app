import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import orderPickingReducer from './store/reducers/order-picking';
import userReducer from './store/reducers/user';
import './index.css';
import StartApp from './start-app';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootReducer = combineReducers({
    orderPickingState: orderPickingReducer,
    userState: userReducer
});


const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));


ReactDOM.render(<Provider store={store}><StartApp /></Provider>, document.getElementById('root'));
//ReactDOM.render(<StartApp />, document.getElementById('root'));

