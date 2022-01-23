import React, { useState } from "react";
import './css/Form.css';

import axios from 'axios';

function SignUp() {

    const [userName, setUserName] = useState('');
    const [eMail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');

    const [nameError, setNameError] = useState('');
    const [mailError, setMailError] = useState('');
    const [passError, setPassError] = useState('');
    const [repeatError, setRepeatError] = useState('');

    const [successMsg, setSuccessMsg] = useState('')


    function validate(event) {
        event.preventDefault();

        let errors = false;

        // Conditional rendering  https://reactjs.org/docs/conditional-rendering.html

        if (userName.trim() === '' || userName.length < 4 || userName.includes(' ')) {
            errors = true;
            setNameError("Username can't be blank and shorter than 4 characters")
        } 
        if (eMail.trim() === '' || eMail.includes(' ') || !eMail.includes('@')) {
            errors = true;
            setMailError("Mail can't be blank and must include @")
        } 
        if (password.trim() === '' || password.length < 6 || password.includes(' ')) {
            errors = true;
            setPassError("Password can't be blank and be shorter than 6 characters")
        } else if (
            !password.includes('!') &&
            !password.includes('#') &&
            !password.includes('@ ') && 
            !password.includes('$') && 
            !password.includes('%')
        ) {
            errors = true;
            setPassError("Password must include at least one special character !#@$%")
        } else if (
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
            setPassError("Password must include at least one number 0-9")
        } 
        if (repeat !== password) {
            errors = true;
            setRepeatError("Repeated password doesn't match password")
        } 
      
        if (errors === false) {
            sendData();
        } 
        
    }

    function sendData() {

        let newUser = {
            username: userName,
            email: eMail,
            password: password,
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
            setUserName('');
            setEmail('');
            setPassword('');
            setRepeat('');
            console.log(req.data);  
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <div className="wrapper">
            <h3>Let's Join Us!</h3>
            <form className="SignUp" onSubmit={validate}>
                <input type="text" placeholder="Username" value={userName} onChange={(event) => {setUserName(event.target.value)}} onFocus={() => setNameError('')}/>
                {nameError && <span className="error-msg">{nameError}</span>}
                <input type="text" placeholder="E-mail" value={eMail} onChange={(event) => setEmail(event.target.value)} onFocus={() => setMailError('')}/>
                {mailError && <span className="error-msg">{mailError}</span>}
                <input type="text" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} onFocus={() => setPassError('')}/>
                {passError && <span className="error-msg">{passError}</span>}
                <input type="text" placeholder="Repeat Password" value={repeat} onChange={(event) => setRepeat(event.target.value)} onFocus={() => setRepeatError('')}/> 
                {repeatError && <span className="error-msg">{repeatError}</span>}
                <button type="submit">Sign Up</button>
                <span>{successMsg}</span>
            </form>
            
        </div>
       
    );
}



export default SignUp;