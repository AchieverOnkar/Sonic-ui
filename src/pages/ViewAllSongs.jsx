import React, { useState, useRef, useEffect } from 'react';
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';
import toast from 'react-hot-toast';
import play from '../assets/play.png'
import play1 from '../assets/play1.png'

const ViewAllSongs = () => {
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [updating, setUpdating] = useState(false);
    const [isError, setIsError] = useState(false);
    const favbuttonFlag = { songId: 0, isActive: false };

    const changeButtonState = (songId) => {
        favbuttonFlag.songId = songId;
        favbuttonFlag.isActive = !favbuttonFlag.isActive;
    }

    const handleSubmit = async (e, songId) => {
        e.preventDefault();
        setUpdating(true);
        const email = sessionStorage.getItem('email');
        try {
            const res = await apiService.post('/addToFavorite', null, { params: { songId, email } });
            setIsError(false);
            setUpdating(false);
            if (res.data === 'success') {
                toast.success("added to favorites!!");
                favbuttonFlag.isActive = true;

            } else {
                toast.error(res.data);
                favbuttonFlag.isActive = false;
            }
            console.log(res.data);
        } catch (error) {
            setIsError(true);
            setUpdating(false);
            toast.error(error);
            console.error('Error submitting form:', error);
        }
    }





    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [songsList, setsongsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!songsList.length) {
                    setIsLoading(true);
                    setError(false);
                    const response = await apiService.get('/viewAllSongs');
                    setsongsList(response.data);
                    console.log(response.data);
                    setIsLoading(false);
                }

            } catch (error) {
                setError(true);
                toast.error(error);
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [songsList]);

    if (isLoading) {
        return (
            <SyncLoader color="royalblue" />
        )
    }
    if (error || isError) {
        return (
            <h1 className='error'>something went wrong</h1>
        )
    }



    const playPauseSong = (songIndex) => {
        if (audioRef.current) {
            // If the same song is clicked, toggle play/pause
            if (currentSongIndex === songIndex) {
                if (isPlaying) {
                    audioRef.current.pause();
                } else {
                    audioRef.current.play();
                }
                setIsPlaying((prevIsPlaying) => !prevIsPlaying);
            } else {
                // Play a new song
                audioRef.current.src = songsList[songIndex].link;
                audioRef.current.play();
                setCurrentSongIndex(songIndex);
                setIsPlaying(true);
            }
        }
    };


    const stopSong = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const playNextSong = () => {
        const nextIndex = (currentSongIndex + 1) % songsList.length;
        playPauseSong(nextIndex);
    };

    const playPreviousSong = () => {
        const prevIndex = (currentSongIndex - 1 + songsList.length) % songsList.length;
        playPauseSong(prevIndex);
    };



    return (
        <div className='page-wrapper'>
            <div className='profile' >
                <img  className='small' src={play1} alt="broken" />
                <div className="profile-text" >
                    <p className='profile-name large'>Songs</p>
                    <p className='profile-desc'>Explore a diverse collection of songs from your favorite artists and genres.</p>
                </div>
            </div>
            <div className='songs-table'>
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
                                        <button type="submit" disabled={updating} onClick={() => changeButtonState(song.id)}>
                                            {(favbuttonFlag.songId === song.id && favbuttonFlag.isActive !== true) ?
                                                <i className="ri-heart-3-line"></i> : <i className="ri-heart-3-fill"></i>}
                                        </button>

                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {currentSongIndex !== null && (
                <div className="currently-playing">
                    <img src={songsList[currentSongIndex].posterLink} alt="broken" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                    <p>Now Playing: {songsList[currentSongIndex].name} by {songsList[currentSongIndex].artist}</p>
                    <div>
                        <button onClick={playPreviousSong}>Previous</button>
                        <button onClick={stopSong}>Stop</button>
                        <button onClick={playNextSong}>Next</button>
                    </div>
                </div>
            )}
            <audio ref={audioRef} />
        </div>
    );
};

export default ViewAllSongs;
