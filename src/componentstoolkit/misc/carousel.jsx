import React from 'react'
import { Link } from 'react-router-dom';

const Carousels = () => {
    return (
        <main className='carousel-main' style={{
            backgroundImage: `url(/hero2.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize:'100% 100%'
        }}>
            <h2 className='hero-text'>A file storage util for file uploads and conversion</h2>
         
            <span >
                <Link className='carousel-button' to='/login'>Login</Link>
                <Link className='carousel-button' to='/signup'>SignUp</Link>
            </span>
        </main>
    );
}

export default Carousels