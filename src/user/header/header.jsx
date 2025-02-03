import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    return (
        <div className='header position-sticky'>
            <div className='container d-between-middle h-100'>
                <div className='profile d-middle'>
                    <h6 className='mx-2 mb-0'>React UI</h6>
                </div>
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
