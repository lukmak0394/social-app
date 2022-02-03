import React, {useState} from 'react';
import axios from 'axios';


function Post(props) {

    const [liked, setLiked] = useState()

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
                props.getPosts();
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
                setLiked(true);
                props.getPosts();
            }).catch((error) => {
                console.log('AXIOS ERROR: ', error);
            })
    }

    function disLikePost(id) {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.forwardToken.jwt_token,
        }

        axios.post(
            'https://akademia108.pl/api/social-app/post/dislike',
            {post_id: id},
            { 'headers': headers })
            .then((req) => {
                setLiked(false);
                props.getPosts();
            }).catch((error) => {
                console.log('AXIOS ERROR: ', error);
            })
    }

    function switchLiked(id) {
        if (liked) {
            disLikePost(id);
        } else {
            likePost(id);
        }
    }

    let postItems = props.forwardPosts.map((post) => 
    <div className="post-item" key={post.id}>
        <img src={post.user.avatar_url}></img >
        <p>{post.user.username}</p>
        <p className='content'>{post.content}</p>
        <p>{ `Likes:  ${post.likes.length}`}</p>
        {props.forwardToken && <button onClick={() => {deletePost(post.id)}}>Delete</button>}
        {props.forwardToken && <button onClick={() => {switchLiked(post.id)}}>React</button>}
    </div>)
    
    return (
        <div className='post-wrapper'>
            {postItems}
        </div>
    )
}

export default Post;
