import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';


export default function TopSongs() {
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [songsList, setSongsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const playPauseSong = (songIndex) => {
        if (audioRef.current && currentSongIndex === songIndex) {
            // Toggle play/pause if the same song is clicked
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


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await apiService.get('/viewAllSongs');
                setSongsList(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                toast.error(error);
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

        <div className='topsongs'>
            <div className='header-ctn'>
                <span className="heading">Top Charts</span>
                <Link className='a' to="/user/songs">see more</Link>
            </div>

            <table className='songs'>

                <tbody>
                    {songsList.map(song => (
                        <tr key={song.id} onClick={() => playPauseSong(song.id)} className='row'>
                            <td className='rank'>{song.id}</td>
                            <td><img src={song.posterLink} alt="Poster" style={{ maxWidth: '50px', maxHeight: '50px' }} /></td>
                            <td>{song.name}</td>
                            <td>{song.artist}</td>
                            <td >
                                <button className='play' onClick={() => playPauseSong(song.id)}>
                                    {isPlaying && currentSongIndex === song.id ? <i class="ri-pause-fill"></i> : <i class="ri-play-mini-fill"></i>}
                                </button>
                            </td>
                            <td>
                                <form action="/addToFavorite" method="post">
                                    <input type="hidden" name="songId" value={song.id} />
                                    <button type="submit">
                                        <i className="ri-heart-3-fill"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>




        </div>
    )
}
