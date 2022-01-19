import React from "react";
import { Link } from 'react-router-dom';

import './css/NavBar.css';

function NavBar() {
    return(
        <nav className="main-nav">
            <ul className="nav-list">
                <li className="nav-list-item">
                    <Link to="/Home">Home Page</Link>
                </li>
                <li className="nav-list-item">
                    <Link to="/SignUp">Sign Up</Link>
                </li>
                <li className="nav-list-item">
                    <Link to="/Login">Login</Link>
                </li>
                <li className="nav-list-item">
                    <Link to="/Feed">News Feed</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;