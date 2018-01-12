import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then(res => {
        // update state
        dispatch({ type: AUTH_USER });
        // save token
        localStorage.setItem('token', res.data.token);
        // redirect user to '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(res => {
        // update state
        dispatch({ type: AUTH_USER });
        // save token
        localStorage.setItem('token', res.data.token);
        // redirect user to '/feature'
        browserHistory.push('/feature');
      })
      .catch(({ response }) => {
        const { status, data: { error } } = response;
        dispatch(authError(`${status}: ${error}`));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(({ data }) => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: data.message,
        });
      })
      .catch(res => console.log(res));
  };
}
