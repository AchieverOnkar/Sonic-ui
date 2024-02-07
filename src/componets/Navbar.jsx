import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';
import toast from 'react-hot-toast';


export default function Navbar() {
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await apiService.get('/logout');
      if (response.data === 'login') {
        navigate("/login");
        toast.success('logged out')
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error);
    }
  }
  useEffect(() => {
    ;(async () => {
      try {
        const email = sessionStorage.getItem('email');
        const response = await apiService.get('/userStatus', { params: { email } });
        if (response.data !== 'false') {
          setIsPremium(true);
        } else {
          setIsPremium(false);
        }
      } catch (error) {
        toast.error("error fetchin the user status");
      }
    })();
  })



  return (
    <div>
      <nav className='nav-container' >

        {/* Conditional rendering based on isPremium */}
        {isPremium ? (
          <div className='premium'>
            <h4>Premium user</h4>
          </div>
        ) : (
          <div>
            <button>
              <a href="/pay">Go Premium</a>
            </button>
          </div>
        )}

        <button onClick={handleLogout} disabled={loading} className='submit-btn'>
          {loading ? (
            <SyncLoader color='white' size={5} />
          ) : (
            <>
              <i className="ri-logout-circle-line"></i>
              Logout
            </>
          )}
        </button>

      </nav>
    </div>
  );
}
