import React from 'react';
import Stepper from 'bs-stepper';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';

class StepperReactComponent extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('**************************************************');
    console.log(Stepper);
    this.stepper = new Stepper(document.querySelector('#stepper'), {
      linear: false,
      animation: true
    });
  }

  onsubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div class="col-md-12 mt-5">
        <div id="stepper" class="bs-stepper">
          <div class="bs-stepper-header">
            <div class="step" data-target="#dneo">
              <button type="button" class="btn step-trigger">
                <span class="bs-stepper-circle">1</span>
                <span class="bs-stepper-label">Connect to desknet's Neo</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#google">
              <button type="button" class="btn step-trigger">
                <span class="bs-stepper-circle">2</span>
                <span class="bs-stepper-label">Connect to Google</span>
              </button>
            </div>
            <div class="line"></div>
            <div class="step" data-target="#complete">
              <button type="button" class="btn step-trigger">
                <span class="bs-stepper-circle">3</span>
                <span class="bs-stepper-label">Comolete!</span>
              </button>
            </div>
          </div>
          <div class="bs-stepper-content">
            <div id="dneo" class="content">
              <h1>Step1</h1>
            </div>
            <div id="google" class="content">
              <h1>Step2</h1>
            </div>
            <div id="complete" class="content">
              <h1>Step3</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StepperReactComponent;