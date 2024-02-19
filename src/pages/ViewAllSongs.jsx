import React, { useState, useRef, useEffect } from 'react';
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';
import toast from 'react-hot-toast';
import play from '../assets/play.png'
import play1 from '../assets/play1.png'
import { useDispatch, useSelector } from 'react-redux';
import { setSongId } from '../features/playerSlice';

const ViewAllSongs = () => {
    const dispatch = useDispatch();
    const [updating, setUpdating] = useState(false);
    const [isError, setIsError] = useState(false);


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
                    console.log("dome");
                }

            } catch (error) {
                setError(true);
                toast.error(error);
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [songsList]);





    const currentSongId = useSelector(state => state.player.currentSongId);

    const playPauseSong = (songIndex) => {
        dispatch(setSongId(songIndex));
    };
    return isLoading? <SyncLoader color='royalblue' /> :(

        <div className='page-wrapper'>
            <div className='profile' >
                <img className='small' src={play1} alt="broken" />
                <div className="profile-text" >
                    <p className='profile-name large'>Songs</p>
                    <p className='profile-desc'>Explore a diverse collection of songs from your favorite artists and genres.</p>
                </div>
            </div>
            <div className='songs-table'>
                <table className='table'>
                    <thead>
                        <tr>
                            <td className='songid'>#</td>
                            <td>Poster</td>
                            <td>Song</td>
                            <td>Artist</td>
                            <td className='none'></td>
                            <td >Add to Favorite</td>
                        </tr>
                    </thead>
                    <tbody>
                        {songsList.map(song => (
                            <tr key={song.id} onClick={() => playPauseSong(song.id)}>
                                <td className='songid'>{song.id}</td>
                                <td><img src={song.posterLink} alt="Poster" style={{ maxWidth: '50px', maxHeight: '50px' }} /></td>
                                <td className='song-name'>{song.name}</td>
                                <td className='artist-name'>{song.artist}</td>

                                <td className='playPause'>
                                    <button className='play' onClick={() => playPauseSong(song.id)}>
                                        {currentSongId === song.id ? <i class="ri-pause-fill"></i> : <i class="ri-play-mini-fill"></i>}

                                    </button>
                                </td>
                                <td>
                                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e, song.id) }} >
                                        <input type="hidden" name="songId" value={song.id} />
                                        <button type="submit" disabled={updating}>
                                            <i className="ri-heart-3-fill"></i>
                                        </button>

                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    );
};

export default ViewAllSongs;
