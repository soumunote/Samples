import 'node_modules/bootstrap/dist/css/bootstrap.css';

import dynamic from 'next/dynamic';
const App = dynamic(
  () => import('components/app'), 
  { ssr: false }
);

function HomePage() {
  return (
    <App/>
  );
}

export default HomePage;