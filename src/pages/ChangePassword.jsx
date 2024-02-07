import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const email = sessionStorage.getItem('userEmail');

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError(false);

        try {
            const res = await apiService.post('/changePassword', { email, newPassword });
            setLoading(false);
            console.log(res.data);
            toast.success(res.data);
            res.data === 'success' && navigate('/login');
        } catch (error) {
            setLoading(false);
            setError(true);
            toast.error(error);
            console.log("error while changing the password:" + error);
        }
    }
    if (error) {
        return (
            <h1 className='error'>something went wrong</h1>
        )
    }

    return (
        <div className='form-container-type2'>

            <span className="logo"><i class="ri-flashlight-line"></i><span>SONIC</span></span>
            <h1>Set New Password</h1>
            <form onSubmit={handleSubmit} className='changePassword-form'>
                <label for="">New Password</label>
                <input type="password" name="newPassword" placeholder='Enter new password' onChange={(e) => setNewPassword(e.target.value)} />
                <input type="hidden" value={email} name="email" />
                <button type="submit" disabled={loading}>{loading ? <SyncLoader color='white' size={5} /> : "Submit"}</button>
            </form>
        </div>
    )
}
