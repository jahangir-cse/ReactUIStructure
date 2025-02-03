import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from './admin/header/sidebar';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <header className="header position-sticky p-2">
        <div className="d-flex justify-content-between align-items-center h-100">
          <div className="d-flex align-items-center">
            <Link to={'/dashboard'} className={`nav-link`}>Site Name</Link>
            <button title="Navigation menu" className="navbar-toggler d-lg-none d-md-block mx-2" onClick={toggleSidebar}>
              <i className="bi bi-list text-white mx-2"></i>
            </button>
          </div>
          <div className="d-middle">
            <a href="/" className="text-decoration-none mx-2" target="_blank">Website</a>
          </div>
        </div>
      </header>
      <div className={`row siderbar-parent ${isCollapsed ? 'active-menu' : ''}`}>
        <Sidebar />
        <div className="main-body">
          <main>
            <Outlet />
          </main>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;