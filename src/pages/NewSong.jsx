import React from 'react';
import{useFormik} from 'formik';
import apiService from '../services/apiService';
import toast from 'react-hot-toast';
import SyncLoader from 'react-spinners/SyncLoader';


export default function NewSong() {
    

    const initialValues = {
        name: '',
        artist: '',
        posterLink: '',
        genre: '',
        link: ''
    };
    const formik = useFormik({
        initialValues: initialValues,

        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await apiService.post('/addSong', values);
                // Reset the form after successful submission
                if(res.data ==='success'){
                    toast.success("song added successfully");
                }else{
                    toast.error(res.data);
                }
                resetForm();
            } catch (error) {
                toast.error(error);
                console.error('Error submitting form:', error);
            }
        },
    });
    
    return (
        <div className='wrapper-ctn'>
            <form className='create-form' onSubmit={formik.handleSubmit}>
                <h1>You can Add New Song Here !!!!</h1>
                <label>Name</label>
                <input type="text" 
                       name="name" 
                       placeholder='Enter song name'
                       value={formik.values.name}
                       onChange={formik.handleChange} />
                <br />
                <label>Artist</label>
                <input type="text" 
                       placeholder='Enter artist name' 
                       name="artist" 
                       value={formik.values.artist}
                       onChange={formik.handleChange} />
                <br />
                <label>Poster Link</label>
                <input type="text" 
                       placeholder='Enter song poster link' 
                       name="posterLink"
                       value={formik.values.posterLink}
                       onChange={formik.handleChange} />
                <br />
                <label>Genre</label>
                <input type="text"
                       placeholder='Enter song genre' 
                       name="genre"
                       value={formik.values.genre}
                       onChange={formik.handleChange} />
                <br />
                <label>Link</label>
                <input type="text" 
                       placeholder='Enter song link ' 
                       name="link"
                       value={formik.values.link}
                       onChange={formik.handleChange} />
                <br />
                <button type='submit' disabled={formik.isSubmitting} className='button'>{formik.isSubmitting ? <SyncLoader color='white'/> :"Add Artist"}</button>
            </form>
        </div>
    );
}
