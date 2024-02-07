import React from 'react'
import { AdminNavbar } from '../componets/AdminNavbar';

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AdminHome from './AdminHome';
import ViewAllSongs from './ViewAllSongs';
import ViewPlaylist from './ViewPlaylist';
import ViewAllArtist from './ViewAllArtist';
import CreateArtist from './CreateArtist';
import CreatePlaylist from './CreatePlaylist';
import NewSong from './NewSong';






export default function AdminDashboard() {
    return (
        <div className='container'> 
            <AdminNavbar />
            <div className="admin-ctn">
                <Outlet />
            </div>
        </div>
    )
}

const AdminRounting = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<AdminDashboard />}
            >
                {/* Nested Routes inside UserDashboard */}
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<AdminHome />} />
                <Route path="view-songs" element={<ViewAllSongs />} />
                <Route path="view-playlist" element={<ViewPlaylist />} />
                <Route path="view-artists" element={<ViewAllArtist />} />
                <Route path="add-songs" element={<NewSong />} />
                <Route path="create-playlist" element={<CreatePlaylist />} />
                <Route path="add-artists" element={<CreateArtist />} />
            </Route>
        </Routes>
    );
}
export { AdminRounting };

