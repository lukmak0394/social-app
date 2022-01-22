import React, { useState } from "react";
import './css/Form.css';

import axios from 'axios';

function SignUp() {

    const [userName, setUserName] = useState('');
    const [eMail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');

    const [successMsg, setSuccessMsg] = useState('')

    const [errors, setErrors] = useState('');


    function validate(event) {
        event.preventDefault();

        let errors = false;

        // Conditional rendering  https://reactjs.org/docs/conditional-rendering.html

        if (userName.trim() === '' || userName.length < 4 || userName.includes(' ')) {
            errors = true;
        } else if (eMail.trim() === '' || eMail.includes(' ') || !eMail.includes('@')) {
            errors = true;
        } else if (password.trim() === '' || password.length < 6 || password.includes(' ')) {
            errors = true;
        } else if (
            !password.includes('!') &&
            !password.includes('#') &&
            !password.includes('@ ') && 
            !password.includes('$') && 
            !password.includes('%')
        ) {
            errors = true;
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
        } else if (repeat !== password) {
            errors = true;
        } else {
            errors = false;
            if (errors === false) {
                sendData();
            } 
        } 

        if (errors === true) {
            setErrors('No way')
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
                <input type="text" placeholder="Username" value={userName} onChange={(event) => {setUserName(event.target.value)}}/>
                <input placeholder="E-mail" value={eMail} onChange={(event) => setEmail(event.target.value)}/>
                <input type="text" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <input type="text" placeholder="Repeat Password" value={repeat} onChange={(event) => setRepeat(event.target.value)}/> 
                <button type="submit">Sign Up</button>
                <span>{successMsg}</span>
                {errors && <p>{errors}</p>}
            </form>
            
        </div>
       
    );
}



export default SignUp;