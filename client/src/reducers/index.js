import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import api_content from './api_content';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  content: api_content,
});

export default rootReducer;
