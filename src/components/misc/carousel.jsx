import React from 'react'
import { Link } from 'react-router-dom';
import image from './pattern.jpg'

const Carousels = () => {
    return (
        <main className='carousel-main'>
            <img src={image} className="carousel-img" alt="..." />
            <span >
                <Link className='carousel-button' to='/login'>Login</Link>
                <Link className='carousel-button' to='/signup'>SignUp</Link>
            </span>
        </main>
    );
}

export default Carousels