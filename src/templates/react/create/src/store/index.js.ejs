import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

import Reactotron from '../config/reactotron';
import rootReducer from './ducks';
import sagas from './sagas';

import history from '../routes/history';

const sagaMonitor = Reactotron ? Reactotron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const tronMiddleware = Reactotron ? Reactotron.createEnhancer : () => {};

const middlewares = [sagaMiddleware, thunkMiddleware, routerMiddleware(history)];

const store = createStore(
  rootReducer(history),
  compose(
    tronMiddleware(),
    applyMiddleware(...middlewares),
  ),
);

sagaMiddleware.run(sagas);

export default store;
