import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle} from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';
import { AuthContext } from '../../provider/AuthProvider';

const Login = () => {
    const { signIn,googleLogin, } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleGoogle=()=>{
        googleLogin()
        .then(res => {
            console.log(res.user)
        })
        .catch(error=>{
            console.log(error)
        })

    }

    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        const loginErrors = {};

        // Validate email
        if (!email || !email.trim()) {
            loginErrors.email = 'Email is required.';
        }

        // Validate password
        if (!password || !password.trim()) {
            loginErrors.password = 'Password is required.';
        }

        if (Object.keys(loginErrors).length > 0) {
            setErrors(loginErrors);
        } else {
            signIn(email, password)
                .then((res) => {
                    console.log(res.user);
                    navigate(location?.state ? location.state : '/');
                })
                .catch((error) => {
                    setErrors({ general: 'Invalid email or password. Please try again.' }); // Set general error message
                    console.error(error);
                });
        }
    };
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h2 className="text-3xl text-center mb-6 font-semibold">Please Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 p-2 w-full border rounded"
                            placeholder="Enter your password"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Forgot your password?</p>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full">
                        Login
                    </button>
                </form>
                 <p className='text-2xl py-2'>Or</p>

                <p  className='text-white bg-blue-500'>
                <button onClick={handleGoogle} className="btn btn-outline w-full">
                <FaGoogle></FaGoogle>Login with Google
                </button>
                </p>
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general}</p>}
                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
        </div>
    );
};

export default Login;
