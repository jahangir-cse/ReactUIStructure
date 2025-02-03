import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ show }) => {
    return (
        <div className={`navbar p-0 position-fixed ${show ? '' : 'd-none'}`}>
            <ul className='list-unstyled h-100 w-100 overflow-y-auto'>
                <li className='border-top-bottom'>
                    <div className='profile d-middle'>
                        <img src='/assets/img/default-profile.png' alt="Profile" />
                        <div className='mx-2'>
                            <>
                                <h6>Guest</h6>
                                <h6 className='mb-0'>N/A</h6>
                            </>
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
                    <Link to={'/updatepin'}>
                        <div className='d-between-middle'>
                            <span><i className="bi bi-person mr-2"></i>Change Pin</span> <i className="bi bi-chevron-right"></i>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to={'/login'} className='w-100'>
                        <span className='btn btn-outline-light'>Login</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
