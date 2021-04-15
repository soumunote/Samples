import Stepper from 'bs-stepper';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bs-stepper/dist/css/bs-stepper.min.css";

document.addEventListener('DOMContentLoaded', function() {

  const stepper1Node = document.querySelector('#stepper1');
  const stepper1 = new Stepper(document.querySelector('#stepper1'));
  document.querySelectorAll(".stepper1-next").forEach(elem => {
    elem.addEventListener('click', () => stepper1.next());
  });
  document.querySelectorAll(".stepper1-prev").forEach(elem => {
    elem.addEventListener('click', () => stepper1.previous());
  });

  stepper1Node.addEventListener('show.bs-stepper', function (event) {
    console.warn('show.bs-stepper', event);
  });
  stepper1Node.addEventListener('shown.bs-stepper', function (event) {
    console.warn('shown.bs-stepper', event);
  });

  const stepper2 = new Stepper(document.querySelector('#stepper2'), {
    linear: false,
    animation: true
  });
  document.querySelectorAll(".stepper2-next").forEach(elem => {
    elem.addEventListener('click', () => stepper2.next());
  });
  document.querySelectorAll(".stepper2-prev").forEach(elem => {
    elem.addEventListener('click', () => stepper2.previous());
  });

  const stepper3 = new Stepper(document.querySelector('#stepper3'), {
    animation: true
  });
  document.querySelectorAll(".stepper3-next").forEach(elem => {
    elem.addEventListener('click', () => stepper3.next());
  });
  document.querySelectorAll(".stepper3-prev").forEach(elem => {
    elem.addEventListener('click', () => stepper3.previous());
  });

  const stepper4 = new Stepper(document.querySelector('#stepper4'));
  document.querySelectorAll(".stepper4-next").forEach(elem => {
    elem.addEventListener('click', () => stepper4.next());
  });
  document.querySelectorAll(".stepper4-prev").forEach(elem => {
    elem.addEventListener('click', () => stepper4.previous());
  });
});
