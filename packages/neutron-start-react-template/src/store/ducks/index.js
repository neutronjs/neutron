import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

/* Reducers */
// import { reducer as session } from './session';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
  });
