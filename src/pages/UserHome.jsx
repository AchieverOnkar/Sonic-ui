import React from 'react'

import PremiumStatus from '../componets/PremiumStatus';
import PlaylistCard from '../componets/PlaylistCard';
import ArtistDashboard from '../componets/ArtistDashboard';
import TopSongs from '../componets/TopSongs';

export default function UserHome() {
    return (
        <div>
            <PremiumStatus />
            <ArtistDashboard />
            <div className='ctn'>
                <PlaylistCard />
                <TopSongs/>
            </div>
        </div>
    )
}
