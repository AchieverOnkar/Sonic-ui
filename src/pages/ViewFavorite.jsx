import React, { useEffect, useState } from 'react';
import image from '../assets/bg10.jpg';
import SyncLoader from 'react-spinners/SyncLoader';
import apiService from '../services/apiService';
import toast from 'react-hot-toast';


const ViewFavorite = () => {

  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [updating,setUpdating] =useState(false);

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
    <div className='table-container'>
      <div className="image">
        <span className='img-head'>favorites</span>
        <p>Explore a diverse collection of songs from your favorite artists and genres.</p>
      </div>
      {favoriteSongs.length === 0 ? <h1>no favorite songs please add some songs to favorites</h1> :
        <table className='table'>
          <thead>
            <tr>
              <td>Poster</td>
              <td>Artist</td>
              <td>Song</td>
              <td>Genre</td>
              <td>Play</td>
              <td>Remove</td>
            </tr>
          </thead>
          <tbody>
            {favoriteSongs.map(songs => (
              <tr key={songs.id}>
                <td>
                  <img src={songs.posterLink} alt="Poster" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                </td>
                <td>{songs.artist}</td>
                <td>{songs.name}</td>
                <td>{songs.genre}</td>
                <td>
                  <audio controls>
                    <source src={songs.link} type="audio/mpeg" />
                  </audio>
                </td>
                <td>
                  <form   onSubmit={(e) => handleSubmit(e, songs.id)} >
                    <input type="hidden" name="songId" value={songs.id} />
                    <button type="submit" disabled={updating}>Remove</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default ViewFavorite;
