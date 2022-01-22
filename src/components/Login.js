import React, { useState } from "react";
import './css/Form.css';

import axios from 'axios';

function Login(props) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState(' ');

    function sendData(event) {

        event.preventDefault();

        let userData = {
            username: username,
            password: password,
            ttl: 3600
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        axios.post(
            'https://akademia108.pl/api/social-app/user/login', 
            JSON.stringify(userData),
            { 'headers': headers })
        .then((req) => {
            if (req.data.jwt_token) {
                // Przekazujemy obiekt 'user' zawierający token do pamięci lokalnej
                localStorage.setItem('user',JSON.stringify(req.data));
                // W pamięci lokalnej został utworzony obiekt 'user' zawierający token, a teraz za pomocą propsów zostaje wywołana metoda sendTokenMethod, która od razu z poziomu komponentu Login ustawi stan userToken (czyli pobierze z pamięci lokalnej obiekt 'user'), dzięki czemu komponent NavBar, który korzysta z aktualnego stanu userToken będzie mógł zmienić wyświetlaną zawartość.
                props.sendTokenMethod();
                setMessage("Login successfull")
                
            } else {
                setMessage('Invalid username or password')
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <form className="login-form" onSubmit={sendData}>
            <input type="text" placeholder="Username" onChange={(event) => setUserName(event.target.value)}/>
            <input type="text" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
            <button type="submit">Log In</button>
            {message && <p>{message}</p>}
        </form>

    );
}

export default Login;