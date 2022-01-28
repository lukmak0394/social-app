import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import './App.css';

import HomePage from './components/Home';
import SignUp from './components/Signup';
import Login from './components/Login';
import NavBar from './components/NavBar';


function App() {

  // W momencie renderowania komponentu App obiekt user będzie pobrany z pamięci lokalnej i przechowywany w stanie userToken
  const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem('user')));

  // Ta funkcja ustawia stan userToken - zostanie przekazana za pomocą propsów do komponentu login, gdzie zostanie wywołana.
  function sendToken() {
    setUserToken(JSON.parse(localStorage.getItem('user')));
  }


    return (
      <div className="App">
        <h1>Social media app!</h1>
        <Router>
          <NavBar forwardToken={userToken} setUserTokenMethod={setUserToken}/>
          <Routes>
            <Route path="/" element={<HomePage forwardToken={userToken}/>} />
            <Route path="login" element={!userToken ? <Login sendTokenMethod={sendToken}/> : <Navigate replace to="/" />} />
            <Route path="signup" element={!userToken ? <SignUp /> : <Navigate replace to="/"/>} />
          </Routes>
          <Outlet />
        </Router>
      </div>
    );

}

export default App;
