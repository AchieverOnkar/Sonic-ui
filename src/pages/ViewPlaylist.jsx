import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addPlaylistId } from '../features/playlistSlice';



const ViewPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getPlaylist = (PlaylistId) => {
    dispatch(addPlaylistId(PlaylistId));
    navigate('/user/viewPlaylist')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await apiService.get('/viewPlaylist');
        setPlaylists(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error while fetching the playlist: " + error);
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
        <h1>something went wrong</h1>
      </>
    )
  }

  return (
    <div className="ctn-column">
      <p className='title'>Playlists</p>
      <span className='subtitle'>listen to any songs as per mood and occassion</span>

      <div className='card-container'>

        {playlists.map(playlist => (
          <div onClick={()=> getPlaylist(playlist.id)} >
            <div className="card playlistCard" key={playlist.id} style={{backgroundColor:playlist.color }}>
              <button className='play' >
                <i class="ri-play-mini-fill"></i>
              </button>
              <span className="name">{playlist.name}</span>
              <span className="totalsongs">{playlist.songs.length} Tracks</span>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default ViewPlaylist;
