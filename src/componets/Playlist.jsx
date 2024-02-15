import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import apiService from '../services/apiService';
import { SyncLoader } from 'react-spinners';

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);


  const playlistId = useSelector(state => state.playlist.playlistId);

  useEffect(() => {
    ; (async () => {

      try {
        console.log("fetching data");
        setLoading(true);
        const response = await apiService.get(`playlist/${playlistId}`);
        console.log("fetched data");
        setPlaylist(response.data);
        console.log(response.data);
        console.log("assinged data");

        setLoading(false);

      } catch (error) {
        setLoading(false);
        console.log(error);
      }


    })();
  }, [playlistId])

  const songsList = playlist.songs;
  // Sample state for play/pause functionality
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  // Sample function for play/pause functionality
  const playPauseSong = (id) => {
    // Implement your play/pause logic here
    setIsPlaying(!isPlaying);
    setCurrentSongIndex(id);
  };

  // Sample function for form submission
  const handleSubmit = (e, songId) => {
    // Implement your form submission logic here
  };

  // Sample function for changing button state
  const changeButtonState = (songId) => {
    // Implement your button state change logic here
  };


  if (loading) {
    return (
      <SyncLoader color='royalblue' />
    )
  }



  return (
    <div className='page-wrapper'>

      <div className='profile'  >
        <img src="https://i.pinimg.com/736x/32/d9/71/32d971b93557f51dbe50c08ec689a1f4.jpg" alt="broken" />
        <div className='profile-text'>
          <p className='profile-name'>{playlist.name}</p>
          <p className='profile-desc'> <i class="ri-headphone-fill"></i>  {playlist.genre} </p>
          <p className='profile-desc'> <i class="ri-play-circle-fill"></i> {playlist.songs && playlist.songs.length}  tracks </p>
        </div>
      </div>

      <div className="songs-table">
        <table className='table'>
          <thead>
            <tr>
              <td>#</td>
              <td>Poster</td>
              <td>Song</td>
              <td>Artist</td>
              <td></td>
              <td>Add to Favorite</td>
            </tr>
          </thead>
          <tbody>
            {songsList && songsList.map(song => (
              <tr key={song.id} onClick={() => playPauseSong(song.id)}>
                <td>{song.id}</td>
                <td><img src={song.posterLink} alt="Poster" style={{ maxWidth: '50px', maxHeight: '50px' }} /></td>
                <td className='song-name'>{song.name}</td>
                <td className='artist-name'>{song.artist}</td>

                <td >
                  <button className='play' onClick={() => playPauseSong(song.id)}>
                    {isPlaying && currentSongIndex === song.id ? <i class="ri-pause-fill"></i> : <i class="ri-play-mini-fill"></i>}
                  </button>
                </td>
                <td>
                  <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e, song.id) }} >
                    <input type="hidden" name="songId" value={song.id} />
                    <button type="submit" onClick={() => changeButtonState(song.id)}>
                      submit
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )


}

export default Playlist