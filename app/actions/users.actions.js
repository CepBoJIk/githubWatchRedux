export const ADD_USER = 'ADD_USER';
export const CLEAR_USERS = 'REFRESH_USERS_LIST';
export const REPLACE_USER = 'REPLACE_USER';

export function addUser(user) {
  return {
    type: ADD_USER,
    payload: user,
  };
}

export function replaceUser(index, newUser) {
  return {
    type: REPLACE_USER,
    index,
    newUser,
  };
}

export function clearUsers() {
  return {
    type: CLEAR_USERS,
  };
}
