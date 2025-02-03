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
import Weather from './user/weather/weather';
function App() {

  return (
    <div className="container-fluid p-0 m-0">
      <Router>
        <Routes>

          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<UserLayout />}>
            <Route path="/weather" element={<Weather />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;