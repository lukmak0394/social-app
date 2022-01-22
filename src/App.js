import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';

import './App.css';

import HomePage from './components/Home';
import SignUp from './components/Signup';
import Login from './components/Login';
import NavBar from './components/NavBar';
import axios from 'axios';

function App() {

  // W momencie renderowania komponentu App obiekt user będzie pobrany z pamięci lokalnej i przechowywany w stanie userToken
  const [userToken, setUserToken] = useState(localStorage.getItem('user'));


  // Ta funkcja ustawia stan userToken - zostanie przekazana za pomocą propsów do komponentu login, gdzie zostanie wywołana.
  function sendToken() {
    setUserToken(localStorage.getItem('user'));
  }

  function logout() {

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + userToken
    }

    axios.post(
      'https://akademia108.pl/api/social-app/user/login',
      { 'headers': headers })
    .then((req) => {
      console.log('Response received: ', req);
      localStorage.removeItem('user');
      setUserToken('');
    }).catch((error) => {
      console.log('AXIOS ERROR: ', error);
    })

  }

  return (
    <div className="App">
      <h1>Social media app!</h1>
      <Router>
        <NavBar forwardToken={userToken} logoutMethod={logout}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="Home" element={<HomePage />} />
          <Route path="Login" element={<Login sendTokenMethod={sendToken}/>} />
          <Route path="SignUp" element={<SignUp />} />
        </Routes>
        <Outlet />
        
      </Router>
    </div>
  );
}

export default App;
