import React from 'react';

function UserGreeting(props) {
  return <h1>Welcome back!</h1>
}

function GuestGreeting(props) {
  return (
    <>
      <h1>Please sign up.</h1>
    </>
  )
}

export default function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  return (
    isLoggedIn 
      ? <><UserGreeting/><button onClick={props.onClick}>LOGOUT</button></>
      : <><GuestGreeting/><button onClick={props.onClick}>LOGIN</button></>
  );
}
