import React, { useEffect, useState } from 'react'
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const PremiumStatus = () => {
    const [premium, setPremium] = useState(false);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        ; (async () => {
            try {
                const email = sessionStorage.getItem('email');
                const response = await apiService.get('/userStatus', { params: { email } });
                if (response.data === false) {
                    setPremium(false);
                } else {
                    setPremium(true);
                    setName(response.data);
                }
            } catch (error) {
                toast.error(error);
                console.log("error while feching userstatus: " + error);
            }
        })();
    }, [])

    const handleClick = async() => {
        navigate('/pay');
        toast.success('Redirecting to payment page!')
    }




    return (
        <div className='premium-ctn'>
            {!premium ?
                <>
                    <span className="second">Our Feature</span>
                    <span className="first">Get Premium Access & Unlock All Popular Songs</span>
                    <div className='action'>
                        <button className="btn b" onClick={handleClick}>Get Now</button>
                    </div>
                </> :
                <>
                    <span className='first'>{`Welcome back ,${name} !`}</span>
                    <span className='second'>Explore variety of music </span>
                </>
            }
        </div>
    )
}

export default PremiumStatus;