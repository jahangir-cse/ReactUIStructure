import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/actions/authActions';
import { getUser } from "../../redux/actions/userActions";

const Navbar = ({ show }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    const token = localStorage.getItem('refreshToken');
    const userData = useSelector((state) => state.users.user);
    useEffect(() => {
        if (token) {
            const cleanedToken = token.replace(/(^"|"$)/g, '');
            if (cleanedToken) {
                dispatch(getUser(token));
                setIsLoggedIn(true);
            }
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData]);

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/login');
    };

    return (
        <div className={`navbar p-0 position-fixed ${show ? '' : 'd-none'}`}>
            <ul className='list-unstyled h-100 w-100 overflow-y-auto'>
                <li className='border-top-bottom'>
                    <div className='profile'>
                        <div className='mx-2'>
                            {user ? (
                                <>
                                    <h6>{user.fullName}</h6>
                                    <h6 className='mb-0'>{user.mobilePhone}</h6>
                                </>
                            ) : (
                                <>
                                    <h6>Guest</h6>
                                    <h6 className='mb-0'>N/A</h6>
                                </>
                            )}
                        </div>
                    </div>
                </li>
                <li>
                    <Link to={'/updateprofile'}>
                        <div className='d-between-middle'>
                            <span><i className="bi bi-person mr-2"></i>Update Profile</span> <i className="bi bi-chevron-right"></i>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={'/updatepassword'}>
                        <div className='d-between-middle'>
                            <span><i className="bi bi-person mr-2"></i>Change Password</span> <i className="bi bi-chevron-right"></i>
                        </div>
                    </Link>
                </li>
                <li>
                    {isLoggedIn ? (
                        <button className='btn btn-outline-light w-100' onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                            <Link to={'/login'} className='w-100'>
                            <span className='btn btn-outline-light'>Login</span>
                        </Link>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
