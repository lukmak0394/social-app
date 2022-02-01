import React from 'react';

function Post(props) {

    let postItems = props.forwardPosts.map((post) => 
    <div className="post-item" key={post.id}>
        <img src={post.user.avatar_url}></img >
        <p>{post.user.username}</p>
        <p className='content'>{post.content}</p>
        <p>{ `Likes:  ${post.likes.length}`}</p>
        {props.forwardToken && <button onClick={() => {props.deletePost(post.id)}}>Delete</button>}
        {props.forwardToken && <button onClick={() => {props.likePost(post.id)}}>Like</button>}
    </div>)
    
    return (
        <div className='post-wrapper'>
            {postItems}
        </div>
    )
}

export default Post;
