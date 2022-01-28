import axios from 'axios';

function updateFeed(firstPostDate, posts, setPosts) {

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    let postDate = {
        date: firstPostDate,
    }

    axios.post(
        'https://akademia108.pl/api/social-app/post/newer-then',
        postDate,
        { 'headers': headers })
        .then((req) => {
            setPosts(req.data.concat(posts));
        }).catch((error) => {
            console.log('AXIOS ERROR: ', error);
        })
}

export default updateFeed;

