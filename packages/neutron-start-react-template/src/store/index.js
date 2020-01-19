import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './ducks';
import sagas from './sagas';

import history from '../routes/history';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer(history),
  middleware: [
    sagaMiddleware,
    ...getDefaultMiddleware(),
    routerMiddleware(history),
  ],
});

sagaMiddleware.run(sagas);

export default store;
