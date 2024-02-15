import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addPlaylistId } from '../features/playlistSlice';


export default function PlaylistCard() {
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
    ; (async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await apiService.get('/viewPlaylist');
        setPlaylists(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        toast.error(error);
        console.log("error while fetching the playlist:" + error);
      }

    })()

  }, [])
  if(loading){
    return(
      <SyncLoader color='royalblue'/>
    )
  }
  if(error){
    return(
      <h1>something went wrong</h1>
    )
  }

  return (

    <div className='playlistcard'>

      <div className='header-ctn'>
        <span className="heading">Top Playlist</span>
        <Link className='a' to="/user/playlist">see more</Link>
      </div>

      <div className="playlistcard-ctn">

        {playlists.map(playlist => (
          <div onClick={()=> getPlaylist(playlist.id)} >
            <div className="card" key={playlist.id} style={{backgroundColor:playlist.color}}>
              <p className='name'>{playlist.name}</p>
            </div>
          </div>
        ))}
      </div>


    </div>


  )
}

