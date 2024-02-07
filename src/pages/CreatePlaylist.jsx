import React, { useEffect, useState } from 'react';
import song1 from '../assets/Travis_Scott_-_SICKO_MODE_ft._Drake(128k).mp3'
import song2 from '../assets/The_Weeknd_-_Starboy_ft._Daft_Punk_(Official_Video)(128k).mp3';
import song3 from '../assets/_Into_the_Spider-Verse)(128k).mp3';
import apiService from '../services/apiService';
import {useFormik } from 'formik';
import { handleSongCheckboxChange } from './CreateArtist';
import toast from 'react-hot-toast';
import SyncLoader from 'react-spinners/SyncLoader';



export default function CreatePlaylist() {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('/createPlaylist');
                setSongs(response.data);
            } catch (error) {
                toast.error("error fetching songs: "+error);
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const initialValues = {
        name: '',
        posterLink:'',
        genre: '',
        profile: '',
        songs: [],
    };
    const formik = useFormik({
        initialValues:initialValues,
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await apiService.post('/addPlaylist', values);
                if(res.data === 'success'){
                    toast.success("playlist added!!");
                }else {
                    toast.error(res.data);
                }
                resetForm();
            } catch (error) {
                toast.error("Error submitting form: "+error);
                console.error('Error submitting form:', error);
            }
        },
    });
    

    return (
        <div className='wrapper-ctn'>
            <form className='create-form' onSubmit={formik.handleSubmit} >
                <h1>Create New Playlist</h1>
               
                <label >Playlist Name</label>
                <input type="text" 
                       name="name" 
                       placeholder='Enter playlist Name' 
                       value={formik.values.name}
                       onChange={formik.handleChange}
                       />
                <br />
                {/* <label htmlFor="posterLink">Playlist Poster: </label> */}
                <label >Playlist Posterlink</label>
                <input type="text" 
                       name="posterLink" 
                       placeholder='Enter playlist posterlink'
                       value={formik.values.posterLink}
                       onChange={formik.handleChange}
                        />
                <br />
                {/* <label htmlFor="genre">Playlist Genre: </label> */}
                <label >Playlist Genre</label>
                <input type="text" 
                       name="genre" 
                       placeholder='Enter playlist genre'
                       value={formik.values.genre}
                       onChange={formik.handleChange}
                       />
                <br />
                <div className="songs" /* Assuming you want to set a class, use className instead of class in JSX */>
                    <button type='submit' disabled={formik.isSubmitting} className='button'>{formik.isSubmitting ? <SyncLoader color='white' size={5} /> : "Add Playlist"}</button>

                    <p>Select Songs to Add  <i class="ri-checkbox-multiple-fill"></i></p>

                    <table className='songs-list'  >

                        {songs.map(song => (
                            <tbody key={song.id}>
                                <tr>
                                    <td>
                                        <img src={song.posterLink} alt="poster" />
                                    </td>
                                    <td>{song.artist}</td>
                                    <td>{song.name}</td>
                                    <td>
                                        <input type="checkbox" 
                                               name="songs" 
                                               value={song.id} 
                                               onChange={handleSongCheckboxChange}/>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>

                </div>
                <br />
            </form>
        </div>
    );
}
