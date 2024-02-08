import React, { useState } from 'react'
import image from '../assets/bg9.jpg';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiService from '../services/apiService';
import SyncLoader from 'react-spinners/SyncLoader';


export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("animal");
    const [securityAnswer, setSecurityAnswer] = useState("");
    const [loading,setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await apiService.post("/resetPassword", { email, securityQuestion, securityAnswer });
    
            if (response.data === 'changePassword') {
                toast.success("Password reset successful! Redirecting to change password page.")
                sessionStorage.setItem('userEmail',email);
                navigate('/changePassword');
            } else {
                toast.error("Password reset failed. Please check your credentials and try again.")
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error resetting password:", error);
            toast.error("An error occurred while resetting the password. Please try again later.")
        }
    };
    
    
    return (
        <div className=' form-container'>
            <div className="left">
                <img src={image} alt="broken" />
                <div className="textArea">
                    <h1>Reset Password</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='form-type1'>
                <div className="logo"><i class="ri-flashlight-line"></i><span>SONIC</span></div>
                <label for="email">Email</label>
                <input type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label for="securityQuestion">Security Question</label>
                <select name="securityQuestion" id="securityQuestion" onChange={(e) => setSecurityQuestion(e.target.value)} >
                    <option value="animal"> What is your Favorite Animal?</option>
                    <option value="food"> What is your Favorite Food?</option>
                    <option value="color"> What is your Favorite Color?</option>
                </select>
                <input type="text"
                    name="securityAnswer"
                    placeholder='Enter your answer here'
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                />
                <br />
                <button type="submit" className='submit-btn' disabled={loading}>{loading? <SyncLoader color='white' size={5} /> : "submit"}</button>

            </form>

        </div>
    )
}
