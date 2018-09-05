import { combineReducers } from 'redux';
import fetchUsers from './fetch.users.reducer';
import users from './users.reducer';

const appReducer = combineReducers({
  fetchUsers,
  users,
});

export default appReducer;
