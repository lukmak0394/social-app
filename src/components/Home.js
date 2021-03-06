import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Home.css'

import Post from './Post';
import AddPost from './AddPost';
import Login from './Login';
import Recommended from './Recommended';


function HomePage(props) {

    const [posts, setPosts] = useState([]);

    function getNextPosts() {

        const lastPostDate = posts[posts.length - 1].created_at;

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        
        let postDate = {
        date: lastPostDate,
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/older-then',
            postDate,
            { 'headers': headers })
            .then((req) => {
                setPosts(posts.concat(req.data))
            }).catch((error) => {
                console.log('AXIOS ERROR: ', error);
            })
    }

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


    useEffect(() => {
        getPosts();
    },[])
    
    
    return (
        <div className='home-page'>
            {!props.forwardToken ? props.showLogin ? <Login sendTokenMethod={props.sendTokenMethod} /> : false : false}
            {props.forwardToken && <Recommended forwardToken={props.forwardToken} setUserToken={props.setUserToken}/>}
            {props.forwardToken && <AddPost forwardToken={props.forwardToken} forwardPosts={posts} setPosts={setPosts}/>}
            <Post forwardPosts={posts} forwardToken={props.forwardToken} getPosts={getPosts} />
            <button type="submit" onClick={getNextPosts}>Pobierz kolejne</button>
        </div>
    );
}

export default HomePage;