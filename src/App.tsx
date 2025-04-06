import './App.css';
import Home from './layouts/home';
import InstallPWA from './components/InstallPWA';
import UpdateNotification from './components/UpdateNotification';

function App() {
  return (
    <>
      <Home />
      <InstallPWA />
      <UpdateNotification />
    </>
  );
}

export default App;
