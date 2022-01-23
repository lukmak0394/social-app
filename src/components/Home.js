import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Home.css'

import Post from './Post';


function HomePage(props) {

    const [posts, setPosts] = useState([]);

    function getPosts() {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    
        axios.post(
            'https://akademia108.pl/api/social-app/post/latest',
            { 'headers': headers })
            .then((req) => {
                setPosts(req.data)
            }).catch((error) => {
                console.log('AXIOS ERROR: ', error);
            })
    }

    // Google request how to run function sending data to api only once react
    // https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    // w useEffect wywołujemy naszą funkcję getPosts jako callback, a jako drugi argument useEffect przekazujemy pustą tablicę, dzięki czemu posty pobierane są tylko raz w momencie gdy komponent Home jest renderowany i przy zmianaach DOM. Gdy nie używałem tej metody to wysyłało się za dużo zapytań. Czemu?
    useEffect(() => {
       getPosts()
    },[])

    return (
        <div className='home-page'>
            <Post forwardPosts={posts} forwardToken={props.forwardToken}/>
        </div>
    );
}

export default HomePage;