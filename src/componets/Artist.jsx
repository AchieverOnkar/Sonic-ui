import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import apiService from '../services/apiService';
import { SyncLoader } from 'react-spinners';


const Artist = () => {
  const [artistData, setArtistData] = useState([]);
  const artistId = useSelector((state) => state.artist.artistId);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await apiService.get(`/artist/${artistId}`);

        setArtistData(response.data);
        console.log("Artist data:", response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching artist data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [artistId]); // Include artistId as a dependency if it's used inside the useEffect


  // if (loading) {
  //   return <SyncLoader color='royalblue' />;
  // }
  const songsList = artistData.songs;

 

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






  return (
    <div className='page-wrapper'>

      <div className='profile' >
        <img src={artistData.cover} alt="broken" />
        <div className='profile-text'>
          <p className='profile-name'>{artistData.name}</p>
          <p className='profile-desc'>{artistData.profile}</p>
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
            { (songsList !== undefined )? songsList.map(song => (
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
            )): <tr>no songs yet</tr>  }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Artist
