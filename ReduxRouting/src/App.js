import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Route,
  withRouter,
} from 'react-router-dom';

import Login from'./Login';
import Menu from'./Menu';

class App extends Component {

  /*
  Hmm... react-router says @You should not use <Route> outside <Rourter>
  componentDidUpdate(prevProps, prepState) {
    if (this.props.route === prevProps.route) {
    } else {
      this.props.history.push(this.props.route);
    }
  }
  */

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path='/' component={Login}/>
          <Route path='/menu' component={Menu}/>
        </div>
      </BrowserRouter>
    );
  }
}

/* 
Hmm... react-router says @You should not use <Route> outside <Rourter>
const mapStateToProps = state => ({
  route: state.route,
});

export default connect(mapStateToProps, null)(App);
*/

export default App;

