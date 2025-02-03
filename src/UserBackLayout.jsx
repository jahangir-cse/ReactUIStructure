import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './user/footer/footer';

const UserBackLayout = () => (
  <div>
    <div className="main-body-content user-back-layout">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default UserBackLayout;
