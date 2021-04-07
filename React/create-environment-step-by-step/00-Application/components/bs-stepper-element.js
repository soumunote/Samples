import BsStepper from 'bs-stepper';
import React, { Component } from 'react';

class Stepper extends Component {

  componentDidMount() {
    this.stepper = new BsStepper(this.stepperElement, {
      linear: false,
      animation: true
    });
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return <div ref={ stepper => this.stepperElement = stepper }></div>;
  }
}

export default Stepper;