import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css";

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
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
                <a className="navbar-brand">
                    Admin
                </a>
            </div>
            <hr className="text-white my-0" />
            <div className="nav-scrollable">
                <nav className="flex-column">
                    <div className="nav-item">
                        <Link to={'/bundle'}
                            className={`nav-link ${activeItem === 'bundle' ? 'active' : ''}`}
                            onClick={() => handleActive('bundle')}
                        >
                            <i className="bi bi-box-seam"></i> Manage Menu 1
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to={'/financial'}
                            className={`nav-link ${activeItem === 'financial' ? 'active' : ''}`}
                            onClick={() => handleActive('financial')}
                        >
                            <i className="bi bi-images"></i> Manage Menu 2
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link to={'/manageOffer'}
                            className={`nav-link ${activeItem === 'offer' ? 'active' : ''}`}
                            onClick={() => handleActive('offer')}
                        >
                            <i className="bi bi-images"></i> Manage Menu 3
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