import { ACTION } from './actions';

function loginApp(state = {route: ''}, action) {
  switch(action.type) {
    case "LOGIN_ACTION"/*ACTION.LOGIN*/:
      return Object.assign({}, state, {
        route: 'menu',
      });
  }
  return state;
}

export default loginApp;
