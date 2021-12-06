import { compose, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';


import rootReducer from './reducers';
import sagas from './actions'

const composeEnhancers =
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const sagaMiddleware = createSagaMiddleware();

export default createStore(
    rootReducer,
    window.App ? window.App.state : {},
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

// sagaMiddleware.run(sagas);
