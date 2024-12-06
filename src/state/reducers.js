// reducers/index.js
import { combineReducers } from 'redux';
import { reducers } from './index';

const rootReducer = combineReducers({
  auth: reducers.auth,
  project: reducers.project,
});

export default rootReducer;
