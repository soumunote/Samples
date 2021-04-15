import React, { Children } from 'react';
import BsStepper from 'bs-stepper';

function Step(props) {
  return (
    <div class="step" data-target="#dneo">
    <button type="button" class="btn step-trigger">
      <span class="bs-stepper-circle">{props.step}</span>
      <span class="bs-stepper-label">{props.label}</span>
    </button>
    </div>
  );
}

class Stepper extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.stepper = new BsStepper(document.querySelector('#stepper'), {
      linear: false,
      animation: true
    });
  }

  onsubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div id="stepper" class="bs-stepper">
        {this.props.children}
      </div>
    );
  }
}
export { 
  Step
};
export default Stepper;