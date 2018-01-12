import { FETCH_MESSAGE } from '../actions/types';

export default function(state = {}, { type, payload }) {
  switch (type) {
    case FETCH_MESSAGE:
      return { ...state, message: payload };
      break;
    default:
  }

  return state;
}
