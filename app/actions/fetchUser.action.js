export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

export function sendRequest() {
  return {
    type: FETCH_REQUEST,
  };
}

export function responseGetted(data) {
  return {
    type: FETCH_SUCCESS,
    payload: data,
  };
}

export function requestError(error) {
  return {
    type: FETCH_FAILURE,
    error,
  };
}
