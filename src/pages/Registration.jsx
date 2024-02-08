import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import image from '../assets/main2.png';
import apiService from '../services/apiService';
import toast from 'react-hot-toast'
import SyncLoader from 'react-spinners/SyncLoader';



const Registration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            gender: "male",
            role: "user",
            dob: "",
            securityQuestion: "animal",
            securityAnswer: ""
        },
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const request = await apiService.post("/register", values);
                console.log(request.data);
                if (request.data === 'success') {
                    toast.success("successfully registered !!!");
                    navigate('/login');
                } else {
                    toast.error(request.data);
                    resetForm();
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }

        }
    });



    return (
        <div className='register-container'>
            <div className="left">
                <img src={image} alt="broken" />
                <div className="textArea">
                    <h1>Welcome to Registeration</h1>
                </div>
            </div>

            <section>

                <form onSubmit={formik.handleSubmit}>
                    <fieldset className='register-form'>
                        <div className="field-wrapper">
                            <label for="username">Username </label>
                            <input type="text"
                                name="username"
                                placeholder='Enter your correct username'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                required
                            />

                        </div>
                        <div className="field-wrapper">
                            <label for="email">Email </label>
                            <input type="email"
                                name="email"
                                placeholder='Enter your correct email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                required
                            />
                        </div>

                        <div className="field-wrapper">
                            <label for="password">Password</label>
                            <input type="password"
                                name="password"
                                placeholder='Enter your correct password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                required
                            />
                        </div>

                        <div className="field-wrapper">
                            <label for="gender">Gender </label>
                            <div>
                                <input type="radio" name="gender" value="male" onChange={formik.handleChange} />
                                <label for="male" className='secondary'>Male</label>
                                <input type="radio" name="gender" value="female" onChange={formik.handleChange} />
                                <label for="female" className='secondary'>Female</label>
                            </div>
                        </div>

                        <div className="field-wrapper">
                            <label for="role">Role </label>
                            <div>
                                <input type="radio"
                                    name="role"
                                    value="user"
                                    onChange={formik.handleChange}
                                />
                                <label for="user" className='secondary'>User</label>
                                <input type="radio"
                                    name="role"
                                    value="admin"
                                    onChange={formik.handleChange}
                                />
                                <label for="admin" className='secondary'>Admin</label>
                            </div>
                        </div>

                        <div className="field-wrapper">
                            <label for="dob">BirthDay</label>
                            <input type="date"
                                name="dob"
                                value={formik.values.dob}
                                onChange={formik.handleChange}
                                required
                            />
                        </div>




                    </fieldset>
                    <div className="select-wrapper">
                        <label for="securityQuestion">Select Security Question</label>

                        <select name="securityQuestion"
                            id="securityQuestion"
                            value={formik.values.securityQuestion}
                            onChange={formik.handleChange}
                        >
                            <option value="animal"> What is your Favorite Animal?</option>
                            <option value="food"> What is your Favorite Food?</option>
                            <option value="color"> What is your Favorite Color?</option>
                        </select>
                        <input type="text" name="securityAnswer" placeholder='Enter your correct answer' value={formik.values.securityAnswer} onChange={formik.handleChange} />

                    </div>
                    <div className="other">
                        <span>Already have the account?</span>
                        <a href="/login">Login</a>
                    </div>
                    <button type="submit" disabled={loading}  className='submit-btn' >{loading? <SyncLoader color='white' size={5}/> : "Register"}</button>
                </form>



            </section>





        </div>
    )
};

export default Registration;
