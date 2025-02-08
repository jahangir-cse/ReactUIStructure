import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import Home from './user/home/home';
import AdminLayout from './AdminLayout';
import Dashboard from './admin/dashboard/dashboard';
import UserLayout from './UserLayout';
import NotFound from './NotFound';
import UserBackLayout from './UserBackLayout';
import AdminRoute from './AdminRoute';
import Slider from './user/slider/slider';
import Login from './shared/login/login';
import ManageUser from './admin/user/manage';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, fetchRoles } from "./redux/actions/userActions";
import ManageSlider from './admin/slider/manage';
import ManageMedia from './admin/media/media';

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const token = localStorage.getItem('refreshToken');
  const userData = useSelector((state) => state.users.user);
  const roles = useSelector(state => state?.users?.roles || []);

  useEffect(() => {
    if (token) {
      const cleanedToken = token.replace(/(^"|"$)/g, '');
      if (cleanedToken) {
        dispatch(getUser(token));
        dispatch(fetchRoles());
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const selectedRole = user ? roles.find(role => role.id === user.roleId) : null;

  useEffect(() => {
    if (selectedRole) {
      //console.log('selectedRole', selectedRole);
    }
  }, [selectedRole]);

  return (
    <div className="container-fluid p-0 m-0">
      <Router>
        <Routes>
          {/* If no user role is selected, redirect to login */}
          {/* {!selectedRole && <Route path="*" element={<Navigate to="/login" />} />} */}

          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/slider" element={<Slider />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Routes for Admin users */}
          {selectedRole && selectedRole.name === 'SuperAdmin' && (
            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/manageUser" element={<ManageUser />} />
                <Route path="/manageSlider" element={<ManageSlider />} />
                <Route path="/manageMedia" element={<ManageMedia />} />
              </Route>
            </Route>
          )}

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;