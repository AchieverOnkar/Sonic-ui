import axios from 'axios'
import React from 'react'
import { BrowserRouter, Link, NavLink, useNavigate } from 'react-router-dom'
import apiService from '../services/apiService';
import toast from 'react-hot-toast'

export const AdminNavbar = () => {
    
    const navigate =  useNavigate();
    const handleLogout = async () => {
        
        try {
            const response =   await apiService.get('/logout');
            if(response.data === 'login') {
                toast.success("logged out")
                navigate("/login");
                sessionStorage.removeItem('email');
            }
        } catch (error) {
            toast.error("something went wrong")
        }
    }
    return (
        <div className="admin-navbar">
            <div className="logo"><Link to="/"><i class="ri-flashlight-line"></i>SONIC</Link></div>
            <ul className='nav-links-ctn'>
                
                <li><NavLink className='nav-link' to="/admin/dashboard"><i class="ri-home-3-line"></i>home</NavLink></li>
                <li><NavLink className='nav-link' to="/admin/view-songs"><i class="ri-disc-line"></i>songs</NavLink></li>
                <li><NavLink className='nav-link' to="/admin/view-playlist"><i class="ri-album-line"></i>artists</NavLink></li>
                <li><NavLink className='nav-link' to="/admin/view-artists"><i class="ri-headphone-line"></i>playlists</NavLink></li>
                <li><NavLink className='nav-link' to="/admin/add-songs"><i class="ri-disc-line"></i>songs</NavLink></li>
                <li><NavLink className='nav-link' to="/admin/create-playlist"><i class="ri-album-line"></i>artists</NavLink></li>
                <li><NavLink className='nav-link' to="/admin/add-artists"><i class="ri-headphone-line"></i>playlists</NavLink></li>
            
            </ul>
            <button onClick={handleLogout} className='nav-action'><i class="ri-logout-circle-line"></i>Logout</button>

        </div>
    )
}
