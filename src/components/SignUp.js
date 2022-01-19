import React, { useState, useRef } from "react";
import './css/Form.css';

function SignUp() {

    function validate(event) {
        event.preventDefault();
    }

    return (
        <div className="wrapper">
            <h3>Let's Join Us!</h3>
            <form className="SignUp" onSubmit={validate}>
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="E-mail" />
                <input type="text" placeholder="Password" />
                <input type="text" placeholder="Repeat Password" /> 
                <button type="submit">Sign Up</button>
            </form>
        </div>
       
    );
}

export default SignUp;