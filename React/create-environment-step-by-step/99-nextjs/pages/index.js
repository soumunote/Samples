import dynamic from 'next/dynamic';
const Stepper = dynamic(
  () => import('../components/stepper.js'),
  { ssr: false }
);

export default function() {
  return (
    <Stepper/>
  );
}
