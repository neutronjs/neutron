import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// import { reducer as session } from './session';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
  });
