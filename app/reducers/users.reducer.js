import {
  ADD_USER,
  CLEAR_USERS,
  REPLACE_USER,
} from '../actions/users.actions';

export default function users(state = [], action) {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        action.payload,
      ];
    case CLEAR_USERS:
      return [];
    case REPLACE_USER:
      return state.map((item, index) => {
        if (index === action.index) {
          return action.newUser;
        }
        return item;
      });
    default:
      return state;
  }
}
