import { createStore } from 'redux';
import appReducer from './reducers/common.reducer';

const store = createStore(appReducer);
export default store;
