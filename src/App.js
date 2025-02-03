import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import Offer from './user/offer/offer';
import Home from './user/home/home';
import Notification from './user/notification';
import Login from './shared/login/login';
import AdminLayout from './AdminLayout';
import Dashboard from './admin/dashboard/dashboard';
import UserLayout from './UserLayout';
import Register from './shared/register/register';
import NotFound from './NotFound';
import ManageOffer from './admin/offer/offer';
import FinancialEntity from './admin/financialEntity/financialEntity';
import Services from './user/services';
import ManageBundleType from './admin/bundle/bundleType';
import ManageNotice from './admin/notice/notice';
import Recharge from './user/recharge/recharge';
import MyUser from './user/manageuser/myUser';
import History from './user/history/history';
import UserBackLayout from './UserBackLayout';
import Balance from './user/balance/balance';
import AddUser from './user/manageuser/addUser';
import UpdateProfile from './user/manageuser/updateProfile';
import UpdatePassword from './user/manageuser/updatePassword';
import UpdatePin from './user/manageuser/updatePin';
import { useSelector } from 'react-redux';
import AdminRoute from './AdminRoute';
import ManageUser from './admin/user/user';
function App() {
  const userRole = 'admin';
  const accessToken = useSelector(state => state.authStore.accessToken);

  return (
    <div className="container-fluid p-0 m-0">
      <Router>
        <Routes>
          {/* Common Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Redirect to login if user role is empty */}
          {userRole === '' && <Route path="*" element={<Navigate to="/login" />} />}

          {/* User Routes */}
          {/* {userRole === 'user' && ( */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<UserBackLayout />}>
            <Route path="/offer" element={<Offer />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/updatepassword" element={<UpdatePassword />} />
            <Route path="/updatepin" element={<UpdatePin />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/services" element={<Services />} />
            <Route path="/offer/:offerType" element={<Offer />} />
            <Route path="/recharge" element={<Recharge />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/myUser" element={<MyUser />} />
            <Route path="/history" element={<History />} />
          </Route>
          {/* )} */}

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manageOffer" element={<ManageOffer />} />
              <Route path="/financial" element={<FinancialEntity />} />
              <Route path="/bundle" element={<ManageBundleType />} />
              <Route path="/notice" element={<ManageNotice />} />
              <Route path="/user" element={<ManageUser />} />
              {/* Add other admin-specific routes here */}
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;