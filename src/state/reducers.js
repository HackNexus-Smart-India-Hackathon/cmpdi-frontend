// reducers/index.js
import { combineReducers } from 'redux';
import authReducer, { chatReducer } from './index';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

export default rootReducer;
