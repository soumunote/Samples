import React from "react";
import "node_modules/bs-stepper/dist/css/bs-Stepper.min.css"
/*
import dynamic from 'next/dynamic';
const Stepper = dynamic(
  () => import('bs-stepper'), 
  { ssr: false }
);
*/
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
        <div id="stepper1" className="bs-stepper">
          <div className="bs-stepper-header" role="tablist">
            <div className="step" data-target="#logins-part">
              <button type="button" className="step-trigger" role="tab" aria-controls="logins-part" id="logins-part-trigger">
                <span className="bs-stepper-circle">1</span>
                <span className="bs-stepper-label">Logins</span>
              </button>
            </div>
            <div className="line"></div>
            <div className="step" data-target="#information-part">
              <button type="button" className="step-trigger" role="tab" aria-controls="information-part" id="information-part-trigger">
                <span className="bs-stepper-circle">2</span>
                <span className="bs-stepper-label">Various information</span>
              </button>
            </div>
          </div>
          <div className="bs-stepper-content">
            <div id="logins-part" className="content" role="tabpanel" aria-labelledby="logins-part-trigger"></div>
            <div id="information-part" className="content" role="tabpanel" aria-labelledby="information-part-trigger"></div>
          </div>
        </div>
      </>
    );
  }
}

export default App;