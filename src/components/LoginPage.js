import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Login = () => {
    
    const navigate = useNavigate();
    const storedUserDetails = localStorage.getItem('userDetails');

    useEffect(() => {
        if (storedUserDetails === null) {
            NotificationManager.warning('Warning message', 'No user is registerd', 2000);
            navigate('/registration');
        }
    }, [storedUserDetails, navigate]);

    const { email: storedEmail, password: storedPassword } = JSON.parse(storedUserDetails || '{}');
    const [checkDetails, setCheckDetails] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCheckDetails((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (storedEmail === checkDetails.email && storedPassword === checkDetails.password) {
            // If match, navigate to home page
            navigate('/home');
        } else {
            setCheckDetails({ email: '', password: '' });
            navigate('/login');
        }
    };
    return (

        <div className='login-page rounded-4 border border-1 bg-body-tertiary mb-4'>
          
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
                <Link className="nav-link active" id="tab-login" data-mdb-toggle="pill" to="/login" role="tab"
                aria-controls="pills-login" aria-selected="true">Login</Link>
            </li>
            <li className="nav-item" role="presentation">
                <Link className="nav-link" id="tab-register" data-mdb-toggle="pill" to="/registration" role="tab"
                aria-controls="pills-register" aria-selected="false">Register</Link>
            </li>
            </ul>
 

 <img src='https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo=' style={{float:'right', height:'20rem', width:'35rem'}}/>
            <div className="tab-content"  style={{marginRight:'50%'}}>
            <div style={{textAlign:'center'}}>
           <h1>Welcome Back</h1>
    <p>Please login to your account</p>
           </div>
            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form onSubmit={handleSubmit}>
                <div className="form-floating mb-4">
                    <input type="email" id="loginName" className="form-control" name="email" value={checkDetails.email} onChange={handleChange} placeholder='name@example.com' />
                    <label className="form-label" htmlFor="loginName">Email</label>
                </div>

                <div className="form-floating mb-4">
                    <input type="password" id="loginPassword" className="form-control" name="password" value={checkDetails.password} onChange={handleChange} placeholder='password'/>
                    <label className="form-label" htmlFor="loginPassword">Password</label>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                </div>
                <div className="text-center">
                    <p>Not a member? <Link to="/registration">Register</Link></p>
                </div>
                </form>
            </div>
            </div>
            {/* <NotificationContainer/> */}
        </div>
    )
}

export default Login