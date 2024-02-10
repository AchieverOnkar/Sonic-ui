import React, { useState } from 'react'


const Artist = () => {

  const songsList = [
    {
      id: 1,
      posterLink: 'https://example.com/poster1.jpg',
      name: 'Song 1',
      artist: 'Artist 1',
    },
    {
      id: 2,
      posterLink: 'https://example.com/poster2.jpg',
      name: 'Song 2',
      artist: 'Artist 2',
    },
    
    // Add more song objects as needed
  ];

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
        <img src="https://e-cdn-images.dzcdn.net/images/artist/033d460f704896c9caca89a1d753a137/500x500-000000-80-0-0.jpg" alt="broken" />
        <div className='profile-text'>
          <p className='profile-name'>The Weeknd</p>
          <p className='profile-desc'>The Weeknd, a Canadian artist, is recognized for his soulful voice and chart-topping hits.</p>
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
            {songsList.map(song => (
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

export default Artist
