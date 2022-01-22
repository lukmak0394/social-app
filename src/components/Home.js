import React from 'react';
import { Outlet } from 'react-router-dom';


function HomePage() {

    return (
        <div className='home-page'>
            <h1>Home page will be here</h1>
            <Outlet />
        </div>
    );
}

export default HomePage;