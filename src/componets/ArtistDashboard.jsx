import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import apiService from '../services/apiService';
import SyncLoader from "react-spinners/SyncLoader";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addArtistId } from '../features/artistSlice';


const ArtistDashboard = () => {
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getArtist = (artistId) => {
      dispatch(addArtistId(artistId));
      navigate('/user/viewArtist')
    }

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
                    <div onClick={()=> getArtist(artist.id)} key={artist.id}>
                        <div className="artist-card">
                            <img src={artist.cover} alt="broken" className="artist-img" />
                            <span className="artist-name">{artist.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ArtistDashboard;
