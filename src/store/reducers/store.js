import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';


import { ConditionReducer } from './conditionReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    condition: ConditionReducer
})

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
