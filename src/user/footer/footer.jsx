import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../header/navbar';
import SupportModal from '../supportModal';

const Footer = () => {
    const [show, setShow] = useState(false);
    const [supportShow, setSupportShow] = useState(false);
    const navigate = useNavigate();

    const handleShow = () => {
        setShow(prevShow => !prevShow);
    };

    const handleSupportShow = () => {
        setSupportShow(prevShow => !prevShow);
    };

    return (
        <div className='footer fixed-bottom'>
            <Navbar show={show} />
            <SupportModal supportShow={supportShow} />
            <div className='container d-between-middle'>
                <Link to={`/`}>
                    <div className='home text-center'>
                        <span className='mb-3'><i className="bi bi-speedometer2 fs-4"></i></span>
                        <h6 className='mb-0'>Home</h6>
                    </div>
                </Link>
                <div className='shop text-center' onClick={handleSupportShow}>
                    <span className='mb-3'><i className="bi bi-info-circle fs-4"></i></span>
                    <h6 className='mb-0'>Support</h6>
                </div>
                <Link to={`/weather`}>
                    <div className='offer text-center'>
                        <span className='mb-3'><i className="bi bi-cup-hot fs-4"></i></span>
                        <h6 className='mb-0'>Weather</h6>
                    </div>
                </Link>

                <div className='menu text-center' onClick={handleShow}>
                    <span className='mb-3'><i className="bi bi-list fs-4"></i></span>
                    <h6 className='mb-0'>Menu</h6>
                </div>
            </div>
        </div>
    );
};

export default Footer;
