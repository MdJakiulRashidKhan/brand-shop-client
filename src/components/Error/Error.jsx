import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="text-center grid content-center h-screen space-y-6">
                <h2 className="text-8xl">!!!! Oops !!!!</h2>
                <p className='text-2xl font-bold'>The page not found or broken</p>
                <h1 className=" text-9xl font-extrabold">404</h1>
                <Link to='/'> <button className="border px-7 py-2 bg-green-500 rounded-xl">Go to Home</button></Link>
            </div>
    );
};

export default Error;