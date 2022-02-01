import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Home.css'

import Post from './Post';
import AddPost from './AddPost';

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

    function deletePost(id) {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.forwardToken.jwt_token,
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/delete',
            {post_id: id},
            { 'headers': headers })
            .then((req) => {
                getPosts();
            }).catch((error) => {
                console.log('AXIOS ERROR: ', error);
            })
    }

    function likePost(id) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.forwardToken.jwt_token,
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/like',
            {post_id: id},
            { 'headers': headers })
            .then((req) => {
                getPosts();
            }).catch((error) => {
                console.log('AXIOS ERROR: ', error);
            })
    }

    return (
        
        <div className='home-page'>
            {props.forwardToken && <Recommended forwardToken={props.forwardToken} />}
            {props.forwardToken && <AddPost forwardToken={props.forwardToken} forwardPosts={posts} setPosts={setPosts}/>}
            <Post forwardPosts={posts} forwardToken={props.forwardToken} deletePost={deletePost} likePost={likePost}/>
            <button type="submit" onClick={getNextPosts}>Pobierz kolejne</button>
        </div>
    );
}

export default HomePage;