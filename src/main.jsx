import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './sass/style.scss';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import  { AdminRounting } from './pages/AdminDashboard.jsx';
import  { UserDashboardRoutes } from './pages/UserDashboard.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import RazorpayPaymentComponent from './pages/RazorpayPaymentComponent.jsx';
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';
import { store } from './store/store.js';

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
  <Provider store={store}>
    {routing}
  </Provider>
);
