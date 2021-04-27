import React from "react";
import Stepper from 'bs-stepper';

class App extends React.Component {

  componentDidMount() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      Animation: true,
    })
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <>
        <h1>Welcome to Next.js</h1>
        <div className="bs-stepper" id="stepper1">
          <div className="bs-stepper-header" role="tablist">
            <div className="step" data-target="#logins-part">
              <button type="button" className="step-trigger" role="tab">
                <span className="bs-stepper-circle">1</span>
                <span classNmae="bs-stepper-label">Logins</span>
              </button>
            </div>
            <div className="line"></div>
            <div className="step" data-target="#information-part">
              <button type="button" className="stepper-trigger" role="tab">
                <span className="bs-stepper-circle">2</span>
                <span classNmae="bs-stepper-label">Various Information</span>
              </button>
            </div>
          </div>
          <div class="bs-stepper-content">
            <div id="login-part" className="content" role="tabpanel"></div>
          </div>
        </div>
      </>
    );
  }
}

export default App;