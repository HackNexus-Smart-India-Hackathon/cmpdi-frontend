// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './index';
import projectReducer from './index';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
});

export default rootReducer;
