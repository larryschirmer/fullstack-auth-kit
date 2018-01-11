import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

export default function(state = {}, { type }) {
  switch (type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
      break;
    case UNAUTH_USER:
      return { ...state, authenticated: false };
      break;
    default:
  }

  return state;
}
