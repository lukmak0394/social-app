import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './css/Home.css'


function Follows(props) {

    const [followed, setFollowed] = useState([]);

    function getFollows() {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.forwardToken.jwt_token,
        }

        axios.post(
            'https://akademia108.pl/api/social-app/follows/allfollows',
            {},
            { 'headers': headers })
            .then((req) => {
                setFollowed(req.data);
            }).catch((error) => {
                console.log('AXIOS ERROR: ', error);
            })
    }

    useEffect(() => {
        getFollows();
    },[])

    function unfollowUser(id) {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.forwardToken.jwt_token,
        }

        let leaderId = {
            leader_id: id,
        }

        axios.post(
            'https://akademia108.pl/api/social-app/follows/disfollow',
            leaderId,
            { 'headers': headers })
            .then((req) => {
                getFollows();
            }).catch((error) => {
                console.log('AXIOS ERROR: ', error);
            })
    }

    let followItems = followed.map((followed) => 
        <li className='follow-item' key={followed.id}>
            <span>{followed.username}</span>
            <button onClick={() => {unfollowUser(followed.id)}}>Unfollow</button>
        </li>
    )
    
    return (
        <ul className='followed'>
            <span>Followed users:</span>
            {followItems}
        </ul>
    )
}

export default Follows;