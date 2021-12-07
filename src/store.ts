import {  createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';


import rootReducer from './reducers';
import sagas from './actions'

const sagaMiddleware = createSagaMiddleware();

export default createStore(
    rootReducer,
    (window as any).App ? (window as any).App.state : {},
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(sagas);
