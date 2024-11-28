// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './index';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
