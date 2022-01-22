import React from "react";
import { Link } from 'react-router-dom';

import './css/NavBar.css';

function NavBar(props) {

    if (props.forwardToken) {
        return (
            <nav className="main-nav">
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <Link to="/Home">Home Page</Link>
                    </li>
                    <li className="nav-list-item" onClick={props.logoutMethod}>Logout</li>
                </ul>
            </nav>
        );
    } else {
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
                </ul>
            </nav>
        );
    }
};

export default NavBar;