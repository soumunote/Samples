import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';

const Stepper = dynamic(
  () => import('../components/stepper.js'),
  { ssr: false }
);
Stepper.Step = dynamic(
  () => import('../components/stepper.js').then(modules => modules.Step),
  { ssr: false }
);

export default function Index() {
  return (
    <Stepper id="stepper1">
      <div class="bs-stepper-header">
        <Stepper.Step step="1" target="#dneo" label="Connect to desknet's Neo" />
        <div class="line"></div>
        <Stepper.Step step="2" target="#google" label="Connect to Google" />
        <div class="line"></div>
        <Stepper.Step step="3" target="#complete" label="Comolete!" />
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
