import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/user.png'
import { AuthContext } from '../../provider/AuthProvider';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked((prev) => !prev);
        const htmlRoot = document.getElementById('root');
        console.log(htmlRoot)
        if (isChecked) {
            htmlRoot.setAttribute('data-theme', 'light');
        } else {
            htmlRoot.setAttribute('data-theme', 'dark');
        }
    };

    const handleSignOut = () => {
        logOut()
            .then((result) => {
                console.log(result);
                navigate("/login");
            })
            .catch((error) => { console.error(error) })
    }

    return (
        <header className='shadow-md py-5'>
            <div className='container mx-auto flex flex-col lg:flex-row
                 gap-3 lg:gap-0 px-3 lg:px-0 items-center justify-between'>
                <h2 className='font-bold text-3xl uppercase'>
                    <img className='w-14 rounded-full p-0 m-0' src={logo} alt="" />
                </h2>
                <nav>
                    <ul className='flex flex-wrap gap-8'>
                        <li className='text-[16px] text-[#131313] font-medium'>
                            <NavLink to={"/"} className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-red-400" : "text-red-900"}>Home</NavLink>
                        </li>

                        {
                            user ? <>
                                <li className='text-[16px] text-[#131313] font-medium'>
                                    <NavLink
                                        to={"/allproduct"}
                                        className={
                                            ({ isActive, isPending }) => isPending ? "pending" :
                                                isActive ? "text-red-400" : "text-red-900"
                                        }
                                    >Product List</NavLink>
                                </li>

                                <li className='text-[16px] text-[#131313] font-medium '>
                                    <NavLink to={"/cart"} className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-400" : "text-red-900"}>Cart</NavLink>
                                </li>
                                <li className='text-[16px] text-[#131313] font-medium  '>
                                    <NavLink to={"/addproduct"} className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-400" : "text-red-900"}>Add Product</NavLink>
                                </li>
                            </> : <>
                                <li className='text-[16px] text-[#131313] font-medium '>
                                    <NavLink to={"/login"} className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-400" : "text-red-900"}>Login</NavLink>
                                </li>
                                <li className='text-[16px] text-[#131313] font-medium '>
                                    <NavLink to={"/register"} className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-red-400" : "text-red-900"}>Sign Up</NavLink>
                                </li>
                            </>

                        }

                    </ul>
                </nav>
                {
                    user && (<div className='flex gap-2 items-center justify-center'>
                        <img className='w-1/12 rounded-full' src={user?.photoURL} alt="" />
                        <p>{user?.displayName}</p>
                        <button onClick={handleSignOut}
                            className="font-bold py-3 px-12 
                                    border border-red-700 rounded-xl
                                    hover:bg-red-900 hover:text-white
                                    hover:border-red-900 text-black">LOG OUT</button>
                           </div>
                           )
                 }
                <div>
                         <input type="checkbox" className="toggle"
                        checked={isChecked} onChange={handleToggle} />
                </div>
            </div>
        </header>
    );
};

export default Navbar;