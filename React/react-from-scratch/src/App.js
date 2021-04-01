import React, { Component } from "react";
import "./App.css";
import Clock from "./Clock";
import Toggle from "./Toggle"; 
import Greeting from "./Greeting";
import TemperratureCalculator from "./TemperatureCalculator";
import { Alert, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogin = this.handleLogout.bind(this);
  }

  handleLogin() {
    this.setState({isLoggedIn: true});
  }

  handleLogout() {
    this.setState({isLoggedIn: false});
  }

  render() {
    return (
      <div className="App">
        <h1>Hello, World!</h1>
        <Clock/>
        <Toggle/>
        <Greeting isLoggedIn={this.state.isLoggedIn} 
                  onClick={this.state.isLoggedIn ? this.handleLogin : this.handleLogout}
        />
        <TemperratureCalculator/>

        <Alert dismissible variant="danger">
          <Alert.Heading>On snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again.
          </p>
        </Alert>
      </div>
    );
  }
}

export default App;
