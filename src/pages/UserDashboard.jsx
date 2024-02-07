import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../componets/sidebar';
import Navbar from '../componets/Navbar';
import UserHome from './UserHome';
import ViewAllSongs from './ViewAllSongs';
import ViewPlaylist from './ViewPlaylist';
import ViewFavorite from './ViewFavorite';
import ViewAllArtist from './ViewAllArtist';



const UserDashboard = () => {
    return (

        <div className='main-container'>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="main">
                <Navbar />
                {/* The Outlet component is a placeholder for nested routes */}
                <Outlet />
            </main>
        </div>

    );
}

const UserDashboardRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<UserDashboard />}
            >
                {/* Nested Routes inside UserDashboard */}
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<UserHome />} />
                <Route path="songs" element={<ViewAllSongs />} />
                <Route path="playlist" element={<ViewPlaylist />} />
                <Route path="favorites" element={<ViewFavorite />} />
                <Route path="artists" element={<ViewAllArtist />} />
            </Route>
        </Routes>
    );
};



export { UserDashboardRoutes };
export default UserDashboard;
