import { combineReducers } from 'redux';
import { rootReducer } from './reducers/rootReducer';

const allReducers = combineReducers({
  rootReducer: rootReducer,
});

export default allReducers;
