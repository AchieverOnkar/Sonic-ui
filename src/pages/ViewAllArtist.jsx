import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';
import apiService from '../services/apiService';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {  addArtistId } from '../features/artistSlice';


const ViewAllArtist = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const getArtistHandler = (artistId) => {
    // Set the artistId in store
    dispatch(addArtistId(artistId));

    // Navigate to the artist component
    navigate('/user/viewArtist');
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await apiService.get('/viewAllArtist');
        setArtists(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error while fetching the artist: " + error);
        setError(true);
        toast.error(error);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <SyncLoader color='royalblue' />
    )
  }
  if (error) {
    return (
      <>
        <h1 className='error'>something went wrong</h1>
      </>
    )
  }

  return (
    <div className='ctn-column'>
      <p className='title'>Artists</p>
      <span className='subtitle'>Explore All Popular Artist</span>
      <div className='card-container'>
        {artists.map(artist => (
          <div onClick={() => getArtistHandler(`${artist.id}`)} key={artist.id} >
            <div className="card" >
              <button className='play' >
                <i class="ri-play-mini-fill"></i>
              </button>

              <img src={artist.cover} alt="broken" className="poster" />
              {/* <span  className='name-header'>Artist</span> */}
              <span className="name">{artist.name}</span>

              <span className="totalsongs">{artist.songs !== null && artist.songs.length} Tracks</span>
              {/* <button className="view">View</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllArtist;
