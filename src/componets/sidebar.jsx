import React, { useEffect, useRef } from 'react'
// import '../sass/main.css'
// import { NavLink } from 'react-router-dom'

import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo1.png'
import apiService from '../services/apiService';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentSongId, setCurrentSongId } from '../features/playerSlice';


export default function Sidebar() {
  const [songsList, setsongsList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(1);
  const audioRef = useRef(null);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await apiService.get('/viewAllSongs');
        // alert("songs feched:" + JSON.stringify(response.data));
        setsongsList(response.data);
        setCurrentSongIndex(1);
      } catch (error) {
        console.log("error fetching song in sidebar: " + error);
      }
    }
    fetchSong();
  }, [])




  const songId = useSelector(state => state.player.songId);

  useEffect(() => {
    playPauseSong(songId);
  }, [songId]);

  const playPauseSong = (songIndex) => {
    if (audioRef.current) {
      // If the same song is clicked, toggle play/pause
      if (currentSongIndex === songIndex) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        // Play a new song
        if (songsList[songIndex]) {
          audioRef.current.src = songsList[songIndex].link;
          audioRef.current.play();
          setCurrentSongIndex(songIndex);
          dispatch(setCurrentSongId(songIndex));
          setIsPlaying(true);
        } else {
          console.error(`Song with index ${songIndex} not found in songsList`);
        }
      }
    }
  };

  const stopSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      dispatch(resetCurrentSongId());
    }
  };

  const resumeSong = (songId) => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      dispatch(setCurrentSongId(songId));

    }
  }


  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songsList.length;
    playPauseSong(nextIndex);
    dispatch(setCurrentSongId(nextIndex));
  };

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + songsList.length) % songsList.length;
    playPauseSong(prevIndex);
    dispatch(setCurrentSongId(prevIndex));
  };

  return (
    <aside className='sidebar'>
      <Link to={"/user/dashboard"}>
        <img className='logo' src={logo} alt="" />
      </Link>
      <div className="links-container">
        <h4><NavLink className="links" to="/user/dashboard" ><i className="ri-speed-up-line"></i> Dashboard</NavLink></h4>
        <h4><NavLink className="links" to="/user/songs"><i className="ri-music-fill"></i> Songs</NavLink></h4>
        <h4><NavLink className="links" to="/user/playlist"><i className="ri-headphone-fill"></i> Playlist</NavLink></h4>
        <h4><NavLink className="links" to="/user/favorites"><i className="ri-heart-3-fill"></i> Favorites</NavLink></h4>
        <h4><NavLink className="links" to="/user/artists"><i className="ri-album-fill"></i> Artists</NavLink></h4>
      </div>
      <div className='musicPlayer'>
        {songsList[currentSongIndex] && (
          <div className="currently-playing">
            <p>Now Playing</p>
            <img src={songsList[currentSongIndex].posterLink} alt="broken" />
            <p className='songName'>{songsList[currentSongIndex].name} </p>
            <p className='artistName'>{songsList[currentSongIndex].artist}</p>
            <div>
              <button className='player-btn' onClick={playPreviousSong}><i class="ri-arrow-drop-left-line"></i></button>
              <button className='player-btn' onClick={() => isPlaying ? stopSong() : resumeSong(currentSongIndex)}>
                {isPlaying ? <i class="ri-pause-mini-line"></i> : <i class="ri-play-fill"></i>} </button>
              <button className='player-btn' onClick={playNextSong}><i class="ri-arrow-drop-right-line"></i></button>
            </div>
          </div>
        )}
        <audio ref={audioRef} />
      </div>
    </aside>
  );
}
