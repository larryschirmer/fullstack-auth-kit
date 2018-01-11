import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER } from './types';

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
      .catch(() => {});
  };
}
  };
}
