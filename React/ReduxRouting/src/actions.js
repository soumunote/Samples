
export const ACTION = {
  LOGIN: "LOGIN_ACTION"
};

export function loginAction(username, passwd) {
  return {
    type: ACTION.LOGIN,
    payload: { 
      username: username,
      passwd: passwd,
    },
  }
}