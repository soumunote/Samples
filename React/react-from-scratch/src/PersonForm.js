import React from 'react';
import { NormalModuleReplacementPlugin } from 'webpack';

class PersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      age: null,
      sex: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("Updated!!!");
    event.prventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Submit"/>
      </form>
    );
  }

}