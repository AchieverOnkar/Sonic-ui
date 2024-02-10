import React from 'react'
// import '../sass/main.css'
// import { NavLink } from 'react-router-dom'

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';


export default function Sidebar() {
    return (
        <aside className='sidebar'>
          <div >
            <h2 className="logo">⚡<span>SONIC</span></h2>
          </div>
          <div className="links-container">
            <h4><NavLink className="links" to="/user/dashboard" ><i className="ri-speed-up-line"></i> Dashboard</NavLink></h4>
            <h4><NavLink className="links" to="/user/songs"><i className="ri-music-fill"></i> Songs</NavLink></h4>
            <h4><NavLink className="links" to="/user/playlist"><i className="ri-headphone-fill"></i> Playlist</NavLink></h4>
            <h4><NavLink className="links" to="/user/favorites"><i className="ri-heart-3-fill"></i> Favorites</NavLink></h4>
            <h4><NavLink className="links" to="/user/artists"><i className="ri-album-fill"></i> Artists</NavLink></h4>
          </div>
        </aside>
      );
}
