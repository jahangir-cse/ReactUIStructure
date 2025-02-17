import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css";
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const user = useSelector((state) => state.users.user);

    const toggleDropdown = (dropdownKey) => {
        setOpenDropdown(prevDropdown => (prevDropdown === dropdownKey ? null : dropdownKey));
    };
    const handleActive = (itemKey, isDropdownItem = false) => {
        setActiveItem(itemKey);
        if (!isDropdownItem) {
            setOpenDropdown(null);
        }
    };

    return (
        <div className='sidebar'>
            <div className="top-row p-3 navbar-dark">
                {user ? (
                    <a className='navbar-brand'>
                        <h6>{user.fullName}</h6>
                        <h6 className='mb-0'>{user.mobilePhone}</h6>
                    </a>
                ) : (
                    <>
                        <a className='navbar-brand'>Guest</a>
                    </>
                )}
            </div>
            <hr className="text-white my-0" />
            <div className="nav-scrollable">
                <nav className="flex-column">
                    <div className="nav-item">
                        <Link to={'/manageUser'}
                            className={`nav-link ${activeItem === 'user' ? 'active' : ''}`}
                            onClick={() => handleActive('user')}
                        >
                            <i className="bi bi-box-seam"></i> Manage User
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to={'/manageSlider'}
                            className={`nav-link ${activeItem === 'slider' ? 'active' : ''}`}
                            onClick={() => handleActive('slider')}
                        >
                            <i className="bi bi-images"></i> Manage Slider
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to={'/manageMedia'}
                            className={`nav-link ${activeItem === 'media' ? 'active' : ''}`}
                            onClick={() => handleActive('media')}
                        >
                            <i className="bi bi-images"></i> Manage Media
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to={'/notice'}
                            className={`nav-link ${activeItem === 'notice' ? 'active' : ''}`}
                            onClick={() => handleActive('notice')}
                        >
                            <i className="bi bi-bell"></i> Manage Notice
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link
                            className="nav-link d-flex justify-content-between align-items-center"
                            onClick={() => toggleDropdown('manageUser')}
                        >
                            <div>
                                <i className="bi bi-person-video3"></i> Manage User
                            </div>
                            <i className={`bi bi-chevron-${openDropdown === 'manageUser' ? 'up' : 'down'}`}></i>
                        </Link>
                        <div className={`dropdown p-2 text-white ${openDropdown === 'manageUser' ? '' : 'd-none'}`}>
                            <ul className="list-group list-unstyled">
                                <li>
                                    <Link to={'/user'}
                                        className={`${activeItem === 'user' ? 'active' : ''}`}
                                        onClick={() => handleActive('user', true)}
                                    >
                                        Users
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;