import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setSongId } from '../features/playerSlice';


export default function TopSongs() {
    const dispatch = useDispatch();
    const [songsList, setSongsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const currentSongId = useSelector(state => state.player.currentSongId);

    const playPauseSong = (songIndex) => {
        dispatch(setSongId(songIndex));
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
    const top5Songs = songsList.slice(0, 5);
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
                    {top5Songs.map(song => (
                        <tr key={song.id} onClick={() => playPauseSong(song.id)} className='row'>
                            <td className='rank'>{song.id}</td>
                            <td><img src={song.posterLink} alt="Poster" style={{ maxWidth: '50px', maxHeight: '50px' }} /></td>
                            <td className='songName'>{song.name}</td>
                            <td className='artist-name'>{song.artist}</td>
                            <td >
                                <button className='play' onClick={() => playPauseSong(song.id)}>
                                    {currentSongId === song.id ? <i class="ri-pause-fill"></i> : <i class="ri-play-mini-fill"></i>}
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
