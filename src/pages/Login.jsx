import React, { useEffect } from 'react';
import { useState } from 'react';
import image from '../assets/bg10.jpg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';

import toast from 'react-hot-toast'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            setLoading(true);
            setError(false);
            const response = await apiService.post('/validate', { email, password });
            if (response.data.success) {
                const role = response.data.role;
                sessionStorage.setItem('email', email);
                (role === "admin") ? navigate('/admin') : navigate('/user');
                toast.success("login successfull !!")

            } else {
                if (response.data.noEmail) {
                    toast.error("Incorrect Email!!! \nPlease enter valid email")
                } else if (response.data.noPassword) {
                    toast.error("Incorrect Password !!! \nPlease enter valid password")
                }
            }
            setError(false);
            setLoading(false);
        } catch (error) {
            setError(true);
            toast.error("error while login");
        }
    };
  



  
    if (error) {
        return (
            <>
                <h1 className='error'>something went wrong</h1>
            </>
        )
    }



    return (
        <div className='form-container'>
            <div className="left">
                <img src={image} alt="broken" />
                <div className="textArea">
                    <h1>Welcome to sonic Login</h1>
                </div>
            </div>
            <section>
                <form onSubmit={handleSubmit} >
                    <fieldset className='form-type1'>
                        {/* <legend>User Login</legend> */}
                        <div className="logo"><i class="ri-flashlight-line"></i><span>SONIC</span></div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='enter your give full name'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="form-error">please enter correct format</span>


                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder='enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="form-error">please enter correct password</span>



                        <span className='link'><a href="/forgotPassword">Forgot Password ?</a></span>
                        <button type='submit' disabled={loading} className='submit-btn'>{loading ? <SyncLoader color='white' size={5}/> : "Login"}</button>
                        <div className="other">
                            <span>Don't have the account?</span>
                            <Link to="/registration">Register</Link>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
};

export default Login;
