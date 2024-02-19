import React, { useEffect, useState } from 'react';
import image from '../assets/bg10.jpg';
import SyncLoader from 'react-spinners/SyncLoader';
import apiService from '../services/apiService';
import toast from 'react-hot-toast';
import heart from '../assets/heart.png'
import { useDispatch, useSelector } from 'react-redux';
import { setSongId } from '../features/playerSlice';


const ViewFavorite = () => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const currentSongId = useSelector(state => state.player.currentSongId);
  const [updating, setUpdating] = useState(false);

  const handleSubmit = async (e, songId) => {
    e.preventDefault();
    setUpdating(true);
    const email = sessionStorage.getItem('email');
    try {
      const res = await apiService.post('/removeFromFavorite', null, { params: { songId, email } });
      setUpdating(false);
      console.log(res.data);
      toast.success(res.data);
      // Remove the song from the local state
      setFavoriteSongs((prevFavoriteSongs) => prevFavoriteSongs.filter(song => song.id !== songId));

    } catch (error) {
      setUpdating(false);
      console.error('Error submitting form:', error);
    }
  }



  useEffect(() => {

    const userEmail = sessionStorage.getItem('email');
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await apiService.get('/viewFavorite', { params: { userEmail } });
        setFavoriteSongs(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error while fetching the playlist: " + error);
        setError(true);
      }
    }
    fetchData();
  }, []);


  if (error) {
    return (
      <>
        <h1>something went wrong</h1>
      </>
    )
  }

  const playPauseSong = (songIndex) => {
    dispatch(setSongId(songIndex));
    console.log("songid dispached:", songIndex);
  };




  return loading ? <SyncLoader color='royalblue' /> :(
    <div className='page-wrapper'>
      <div className="profile">
        <img className='small' src={heart} alt="broken" />
        <div className="profile-text" >
          <span className='profile-name large'>favorites</span>
          <p className='profile-desc'>Explore a diverse collection of songs from your favorite artists and genres.</p>
        </div>
      </div>
      <div className='songs-table'>
        {favoriteSongs.length === 0 ? <p className='error'>No favorite songs yet. <p>Discover and add some!</p></p> :
          <table className='table'>
            <thead>
              <tr>
                <td>Poster</td>
                <td>Song</td>
                <td>Artist</td>
                <td>Genre</td>
                <td>Play</td>
                <td>Remove</td>
              </tr>
            </thead>
            <tbody>
              {favoriteSongs.map(songs => (
                <tr key={songs.id} onClick={() => playPauseSong(songs.id)}>
                  <td>
                    <img src={songs.posterLink} alt="Poster" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                  </td>
                  <td>{songs.name}</td>
                  <td>{songs.artist}</td>
                  <td>{songs.genre}</td>
                  <td >
                    <button className='play' onClick={() => playPauseSong(songs.id)}>
                      {currentSongId === songs.id ? <i class="ri-pause-fill"></i> : <i class="ri-play-mini-fill"></i>}
                    </button>
                  </td>
                  <td>
                    <form onSubmit={(e) => handleSubmit(e, songs.id)} >
                      <input type="hidden" name="songId" value={songs.id} />
                      <button type="submit" className='removeBtn' disabled={updating} style={{backgroundColor:'#e83e3e'}}><i class="ri-close-fill"></i></button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </div>
  );
};

export default ViewFavorite;
