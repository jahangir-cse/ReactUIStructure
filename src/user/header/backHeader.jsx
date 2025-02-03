import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackHeader = ({ handleBack, title }) => {
    const navigate = useNavigate();

    const defaultBack = () => {
        navigate(-1);
    };

    return (
        <div className='header position-fixed'>
            <div className='container d-between-middle h-100'>
                <a className='mx-2' onClick={handleBack || defaultBack}>
                    <i className="bi bi-chevron-left d-middle border border-white pointer"></i>
                </a>
                <label>{title}</label>
                <img src='/assets/img/logo.png' />
            </div>
        </div>
    );
};

export default BackHeader;
