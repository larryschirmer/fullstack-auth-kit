import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

export default function(state = {}, { type, payload }) {
  switch (type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
      break;
    case UNAUTH_USER:
      return { ...state, authenticated: false };
      break;
    case AUTH_ERROR:
      return { ...state, error: payload };
      break;
    default:
  }

  return state;
}
