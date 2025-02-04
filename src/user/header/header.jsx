import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../redux/actions/authActions';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.authStore.accessToken);

    useEffect(() => {
        if (accessToken) {
            const cleanedToken = accessToken.replace(/(^"|"$)/g, '');
            if (cleanedToken) {
                setIsLoggedIn(true);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, [accessToken]);

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/login');
    };

    return (
        <div className='header position-sticky'>
            <div className='container d-between-middle h-100'>
                {isLoggedIn ? (
                    <div className='logo d-middle'>
                        <div className='mx-2'>
                            <h6 className='mb-0'>React UI</h6>
                        </div>
                    </div>
                ) : (
                    <div className='profile d-middle'>
                        <h6 className='mx-2'>Guest User</h6>
                    </div>
                )}

                <div className='d-flex'>
                    <div className='search mx-3 d-middle d-none'>
                        <div className='mr-2 input-div'>
                            <input placeholder='Search...' className='form-control' />
                        </div>
                        <span><i className="bi bi-search fs-4"></i></span>
                    </div>
                    <Link to={'/notification'}>
                        <div className='notification'>
                            <span><i className="bi bi-bell fs-4"></i></span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
