import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='mx-auto w-52 mt-5 font-semibold px-2 text-indigo-500'>
            <Link className='px-2' to='/'>Home</Link>
            <Link className='px-2' to='/login'>Login</Link>
            <Link className='px-2' to='/register'>Register</Link>
        </div>
    );
};

export default Header;