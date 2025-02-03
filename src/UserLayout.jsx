import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './user/header/header';
import Footer from './user/footer/footer';

const UserLayout = () => (
  <div>
    <Header />
    <div className="main-body-content">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default UserLayout;
