// reducers/index.js
import { combineReducers } from 'redux';
import { reducers, chatReducer } from './index';

const rootReducer = combineReducers({
  auth: reducers.auth,
  project: reducers.project,
  // auth: authReducer,
  chat: chatReducer,
});

export default rootReducer;
