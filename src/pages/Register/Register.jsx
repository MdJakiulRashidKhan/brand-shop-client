import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { AuthContext } from '../../provider/AuthProvider';



const Register = () => {
    const { createUser } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    
    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        
        const errors = {};
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
        }
        if (!/[A-Z]/.test(password)) {
            errors.password = 'Password must contain at least one capital letter.';
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            errors.password = 'Password must contain at least one special character.';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            createUser(email, password)
                .then((res) => {
                    console.log(res.user);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded shadow-lg w-96">
                    <h2 className="text-3xl text-center mb-6 font-semibold">Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Name</label>
                            <input type="text" name="name" className="mt-1 p-2 w-full border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input type="email" name="email" className="mt-1 p-2 w-full border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Password</label>
                            <input type="password" name="password" className="mt-1 p-2 w-full border rounded" required />
                            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>
                        <button className="bg-blue-500 hover.bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full">
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
