import React from 'react'
import { Link } from 'react-router-dom';
import image from '../assets/weeknd.jpeg';
import image2 from '../assets/justin.jpg';
import image3 from '../assets/dua.jpg';
import image4 from '../assets/bruno.jpg';
import image5 from '../assets/garix.jpg';
import image6 from '../assets/tylor2.jpg';
import image7 from '../assets/eminem.jpg';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import apiService from '../services/apiService';
import SyncLoader from "react-spinners/SyncLoader";
import toast from 'react-hot-toast';


const ArtistDashboard = () => {
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(false);
                const response = await apiService.get('/viewAllArtist');
                setArtists(response.data);
                console.log(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(true);
                toast.error(error)
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <SyncLoader color="royalblue" />
        )
    }

    if (error) {
        return (
            <>
                <span className='error'>something went wrong</span>
            </>
        )
    }


    return (
        <div className='artist-ctn'>
            <div className='header-ctn'>
                <span className="heading">Top Artist</span>
                <Link className='a' to="/user/artists">see more</Link>
            </div>

            <div className='card-wrapper'>
                {artists.map(artist => (
                    <Link to={`/artist/${artist.id}`} key={artist.id}>
                        <div className="artist-card">
                            <img src={artist.cover} alt="broken" className="artist-img" />
                            <span className="artist-name">{artist.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default ArtistDashboard;
