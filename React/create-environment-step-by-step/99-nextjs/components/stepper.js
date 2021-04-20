import React from 'react';
import BsStepper from 'bs-stepper';

function Step(props) {
  return (
    <div className="step" data-target={props.target}>
      <button type="button" className="btn step-trigger">
        <span className="bs-stepper-circle">{props.step}</span>
        <span className="bs-stepper-label">{props.label}</span>
      </button>
    </div>
  );
}

class Stepper extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.stepper = new BsStepper(document.querySelector(`#${this.props.id}`), {
      linear: false,
      animation: true
    });
  }

  onsubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div id={this.props.id} className="bs-stepper">
        {this.props.children}
      </div>
    );
  }
}
export { 
  Step
};
export default Stepper;