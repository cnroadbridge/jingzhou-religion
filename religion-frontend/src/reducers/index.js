import { combineReducers } from 'redux';
import counter from './counter';
import form from './form';

export default combineReducers({
  counter,
  form
});
