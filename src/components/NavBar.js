import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


import './css/NavBar.css';

function NavBar(props) {

    function logout() {

        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + props.forwardToken,
        }
    
        axios.post(
          'https://akademia108.pl/api/social-app/user/login',
          { 'headers': headers })
          .then((req) => {
            console.log('Successfully logged out');
            localStorage.removeItem('user');
            props.setUserTokenMethod('');
            props.setShowLogin(false);
        }).catch((error) => {
            console.log('AXIOS ERROR: ', error);
        })
    
    }
    
    return(
        <nav className="main-nav">
            <ul className="nav-list">
                <li className="nav-list-item">
                    <Link to="/">Home Page</Link>
                 </li>
                {!props.forwardToken && <li className="nav-list-item">
                    <Link to="/signup">Sign Up</Link>
                </li>}
                {!props.forwardToken && <li className="nav-list-item">
                    <Link to="/login">Login</Link>
                </li>}
                {props.forwardToken && <li className="nav-list-item" onClick={() => {logout()}}>Logout</li>}
            </ul>
        </nav>
    );
};

export default NavBar;


