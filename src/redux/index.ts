import { combineReducers } from 'redux';
import { rootReducer } from './reducers/rootReducer';
import { modalReducer } from './reducers/modalReducer';

const allReducers = combineReducers({
  rootReducer: rootReducer,
  modalReducer: modalReducer,
});

export default allReducers;
