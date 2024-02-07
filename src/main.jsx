import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App.jsx';
import './sass/style.scss';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import UserHome from './pages/UserHome.jsx';
import AdminHome, { AdminRounting } from './pages/AdminDashboard.jsx';
import UserDashboard, { UserDashboardRoutes } from './pages/UserDashboard.jsx';
import ViewAllArtist from './pages/ViewAllArtist.jsx';
import ViewFavorite from './pages/ViewFavorite.jsx';
import ViewPlaylist from './pages/ViewPlaylist.jsx';
import ViewAllSongs from './pages/ViewAllSongs.jsx';
import ResetPassword from './pages/ForgotPassword.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import RazorpayPaymentComponent from './pages/RazorpayPaymentComponent.jsx';
import { Toaster } from 'react-hot-toast'

const routing = (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      {/* this has nested routes  */}
      <Route path="/user/*" element={<UserDashboardRoutes />} />
      <Route path="/admin/*" element={< AdminRounting />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path="/pay" element={<RazorpayPaymentComponent />} />
    </Routes>

    <Toaster position="bottom-right"
      containerStyle={{ right: '30px' }}

      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: 'var(--fg)',
          color: '#fff',
        },

        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }} />


  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>
);
