import React, { useState, useRef } from "react";
import './css/Form.css';

import axios from 'axios';
import { clear } from "@testing-library/user-event/dist/clear";

function SignUp() {
    const userNameRef = useRef();
    const eMailRef = useRef();
    const passwordRef = useRef();
    const repeatRef = useRef();

    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('');


    function validate(event) {
        event.preventDefault();

        let userName = userNameRef.current.value;
        let eMail = eMailRef.current.value;
        let password = passwordRef.current.value;
        let repeat = repeatRef.current.value;

        let errors = false;

        if (userName.trim() === '' || userName.length < 4 || userName.includes(' ')) {
            errors = true;
        }
        if (eMail.trim() === '' || eMail.includes(' ') || !eMail.includes('@')) {
            errors = true;
        }
        if (password.trim() === '' || password.length < 6 || password.includes(' ')) {
            errors = true;
        }
        if (
            !password.includes('!') &&
            !password.includes('#') &&
            !password.includes('@ ') && 
            !password.includes('$') && 
            !password.includes('%')
        ) {
            errors = true;
        }
        if (
            !password.includes("0") &&
            !password.includes("1") &&
            !password.includes("2") &&
            !password.includes("3") &&
            !password.includes("4") &&
            !password.includes("5") &&
            !password.includes("6") &&
            !password.includes("7") &&
            !password.includes("8") &&
            !password.includes("9")
        ) {
            errors = true;
        }
        if (repeat !== password) {
            errors = true;
        }


        if (errors === false) {
            setErrorMsg('');
            sendData();
        } else {
            setErrorMsg('No way!');
        }
        
    }


    function sendData() {

        let newUser = {
            username: userNameRef.current.value,
            email: eMailRef.current.value,
            password: passwordRef.current.value,
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.post(
            'http://akademia108.pl/api/social-app/user/signup', 
            JSON.stringify(newUser),
            { 'headers': headers })
        .then((req) => {
            setSuccessMsg(`Thank you ${newUser.username}. You have been signed up successfully!`)
            console.log(req.data);  
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <div className="wrapper">
            <h3>Let's Join Us!</h3>
            <form className="SignUp" onSubmit={validate}>
                <input type="text" placeholder="Username" ref={userNameRef}/>
                <input type="text" placeholder="E-mail" ref={eMailRef}/>
                <input type="text" placeholder="Password" ref={passwordRef}/>
                <input type="text" placeholder="Repeat Password" ref={repeatRef}/> 
                <button type="submit">Sign Up</button>
                <p>{errorMsg}</p>
                <p>{successMsg}</p>
            </form>
        </div>
       
    );
}

export default SignUp;