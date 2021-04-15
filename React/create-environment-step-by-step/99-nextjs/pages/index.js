import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';

const Stepper = dynamic(
  () => import('../components/stepper.js'),
  { ssr: false }
);

export default function() {
  return (
    <Stepper>
      <div class="bs-stepper-header">
        <Stepper.Step step="1" label="Connect to desknet's Neo"/>
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
    </Stepper>
  );
}
