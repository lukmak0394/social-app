import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './css/Home.css'


function Recommended(props) {

    const [recommended, setRecommended] = useState([]);

    function getRecommendations() {

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + props.forwardToken.jwt_token,
        }

        axios.post(
            'https://akademia108.pl/api/social-app/follows/recommendations',
            {},
            { 'headers': headers })
            .then((req) => {
                setRecommended(req.data)
            }).catch((error) => {
                console.log('AXIOS ERROR: ', error);
            })
    }
    
    useEffect(() => {
        getRecommendations();
    },[])


    let recoItems = recommended.map((recommended) => 
        <li className='reco-item' key={recommended.id}>
            <span>{recommended.username}</span>
        </li>
    )

    return (
        <ul className='recommended'>
            <span>Recommended users:</span>
            {recoItems}
        </ul>
    )
}

export default Recommended;