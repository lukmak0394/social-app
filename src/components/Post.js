import React from 'react';
import './css/Post.css';

function Post(props) {

    let postItems = props.forwardPosts.map((post) => <div className="post-item" key={post.id}>
        <img src={post.user.avatar_url}></img >
        <p>{post.user.username}</p>
        <p className='content'>{post.content}</p>
        <p>{ `Likes:  ${post.likes.length}`}</p>
    </div>)
    
    return (
        <div className='post-wrapper'>
            {postItems}
        </div>
    )
}

export default Post;
