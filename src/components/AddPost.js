import React, { useState } from 'react';
import axios from 'axios';
import './css/Form.css';

import updateFeed from './UpdateFeed';

function AddPost(props) {

    const [newPostContent, setNewPostContent] = useState('');

    function NewPost(event) {
        event.preventDefault()
        
        let postContent = {
            content: newPostContent,
        }

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.forwardToken.jwt_token,
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/add',
            postContent,
            { 'headers': headers })
            .then((req) => {
                updateFeed(props.forwardPosts[0].created_at, props.forwardPosts, props.setPosts)
            }).catch((error) => {
                console.log('AXIOS ERROR: ', error);
            })
    }

   

    return (
        <form className='add-post-form' onSubmit={NewPost}>
            <textarea className='new-post-input' onChange={(event) => setNewPostContent(event.target.value)}></textarea>
            <button type='submit'>Add Post</button>
        </form>
    )
}

export default AddPost;