import { FETCH_REQUEST, FETCH_FAILURE, FETCH_SUCCESS } from '../actions/fetchUser.action';

const requestStatus = {
  type: null,
  data: null,
  error: null,
};

export default function fetchUsers(state = requestStatus, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...requestStatus,
        type: FETCH_REQUEST,
      };
    case FETCH_SUCCESS:
      return {
        ...requestStatus,
        type: FETCH_SUCCESS,
        data: action.payload,
      };
    case FETCH_FAILURE:
      return {
        ...requestStatus,
        type: FETCH_FAILURE,
        error: action.error,
      };
    default:
      return state;
  }
}
