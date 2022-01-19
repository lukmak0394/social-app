import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';

import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <h1>Social media app!</h1>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
