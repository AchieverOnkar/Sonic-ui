import React, { useEffect } from 'react';
import song1 from '../assets/Travis_Scott_-_SICKO_MODE_ft._Drake(128k).mp3'
import song2 from '../assets/The_Weeknd_-_Starboy_ft._Daft_Punk_(Official_Video)(128k).mp3';
import song3 from '../assets/_Into_the_Spider-Verse)(128k).mp3';
import { useState } from 'react';
import axios from 'axios';
import apiService from '../services/apiService';
import {useFormik } from 'formik';
import toast from 'react-hot-toast';
import SyncLoader from 'react-spinners/SyncLoader';


export default function CreateArtist() {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.get('/createArtist');
                setSongs(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const initialValues = {
        name: '',
        cover: '',
        profile: '',
        songs: [],
    };
    const formik = useFormik({
        initialValues: initialValues,

        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await apiService.post('/addArtist', values);
                if(res.data === 'success'){
                    toast.success("artist added!!");
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
                <h1>Add Artists</h1>

                <label htmlFor="name">Artist Name </label>
                <input type="text"
                    name="name"
                    placeholder='Enter artist name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <br />
                <label htmlFor="cover">Artist Cover </label>
                <input type="text"
                    name="cover"
                    placeholder='Enter artist photo link'
                    value={formik.values.cover}
                    onChange={formik.handleChange}
                />
                <br />
                <label htmlFor="profile">Artist Profile </label>
                <input type="text"
                    name="profile"
                    placeholder='Enter artist description'
                    value={formik.values.profile}
                    onChange={formik.handleChange}
                />
                <br />

                <button type='submit' className='button' disabled={formik.isSubmitting}>{formik.isSubmitting ? <SyncLoader color='white' size={5}/> : "Add Artist"}</button>
                <div className="songs" >

                    <p>Select Existing Songs of Artist to Add  <i class="ri-checkbox-multiple-fill"></i></p>

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
                                            onChange={() => handleSongCheckboxChange(song)}
                                        />
                                        
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

export const handleSongCheckboxChange = (selectedSong) => {
    const isSelected = formik.values.songs.some(song => song.id === selectedSong.id);
    if (isSelected) {
        // Remove the song if it's already selected
        formik.setValues({
            ...formik.values,
            songs: formik.values.songs.filter(song => song.id !== selectedSong.id),
        });
    } else {
        // Add the song if it's not selected
        formik.setValues({
            ...formik.values,
            songs: [...formik.values.songs, selectedSong],
        });
    }
};
