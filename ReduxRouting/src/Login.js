import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from './actions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.username = React.createRef();
    this.passwd = React.createRef();

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidUpdate(prevProps, prepState) {
    if (this.props.route === prevProps.route) {
    } else {
      this.props.history.push(this.props.route);
    }
  }

  handleOnClick() {
    //this.props.history.push('./menu');
    // fire action synchronously ... But, Not Direct routing!!!
    this.dispatch(loginAction(this.username.current.value, this.passwd.current.value));
  }

  render() {
    return (
      <div>
        <p><label>Username:<input type="text" ref={this.username} /></label></p>
        <p><label>Password:<input type="text" ref={this.passwd} /></label></p>
        <p><button onClick={this.handleOnClick} >LOGIN</button></p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  route: state.route,
});

export default connect(mapStateToProps, null)(Login);
