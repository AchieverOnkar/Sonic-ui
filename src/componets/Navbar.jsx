import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';
import toast from 'react-hot-toast';


export default function Navbar() {
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    ; (async () => {
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


        <button className="hamburger-menu out" onClick={toggleMenu}>
          <span className="hamburger-icon"><i class="ri-menu-line"></i></span>
        </button>
        <nav className="mobile-menu" style={{ display: isMenuOpen ? 'block' : 'none' }}>
          <div className="header">
            <button className="hamburger-menu" onClick={toggleMenu}>
              <span className="hamburger-icon"><i class="ri-menu-fold-line"></i></span>
            </button>
          </div>
          <ul>
            <li><NavLink onClick={() => setIsMenuOpen(false)} className="links" to="/user/dashboard"><i className="ri-speed-up-line"></i> Dashboard</NavLink></li>
            <li><NavLink onClick={() => setIsMenuOpen(false)} className="links" to="/user/songs"><i className="ri-music-fill"></i> Songs</NavLink></li>
            <li><NavLink onClick={() => setIsMenuOpen(false)} className="links" to="/user/playlist"><i className="ri-headphone-fill"></i> Playlist</NavLink></li>
            <li><NavLink onClick={() => setIsMenuOpen(false)} className="links" to="/user/favorites"><i className="ri-heart-3-fill"></i> Favorites</NavLink></li>
            <li><NavLink onClick={() => setIsMenuOpen(false)} className="links" to="/user/artists"><i className="ri-album-fill"></i> Artists</NavLink></li>
          </ul>
        </nav>



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
        <div className="logo"><Link to="/user">⚡ SONIC</Link></div>


        <button onClick={handleLogout} disabled={loading} className='submit-btn'>
          {loading ? (
            <SyncLoader color='white' size={5} />
          ) : (
            <>
              <i className="ri-logout-circle-line"></i>
              <span className="logout">Logout</span>
            </>
          )}
        </button>

      </nav>
    </div>
  );
}
