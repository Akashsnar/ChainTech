
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';


const Registration = () => {

  const navigate = useNavigate();


  const [userDetails, setUserDetails] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update user details based on the changed input
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDetails.password === userDetails.confirmPassword) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      NotificationManager.success('Success message', 'User registered');
      navigate('/home');
    } else {

      NotificationManager.error('Error message', 'passwords do not match')
      setUserDetails({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigate('/registration');
    }
  };
  return (
    <>
      <NotificationContainer />
      <div className='registration-page rounded-4 border border-1 bg-body-tertiary mb-4'>
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <Link className="nav-link" id="tab-login" data-mdb-toggle="pill" to="/login" role="tab"
              aria-controls="pills-login" aria-selected="false">Login</Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link className="nav-link active" id="tab-register" data-mdb-toggle="pill" to="/registration" role="tab"
              aria-controls="pills-register" aria-selected="true">Register</Link>
          </li>
        </ul>
        <div  style={{display:'inline'}}>
        <img src='https://assets-news.housing.com/news/wp-content/uploads/2018/01/24194015/Goa%E2%80%99s-RERA-website-launched-builders-to-register-projects-by-February-24-2018-FB-1200x628-compressed.jpg'  style={{width:'44%',height:'62%', position:'absolute'}} />
        <div className="tab-pane" id="pills-register" role="tabpanel" aria-labelledby="tab-register"  style={{marginLeft:'50%'}}>
          <form onSubmit={handleSubmit} >

            <div style={{ textAlign: 'center' }}>
              <h1>Welcome</h1>
              <p>Please Register your account</p>
            </div>
            <div className="form-floating mb-4">

              <input type="text" id="registerUsername" className="form-control" name='userName' value={userDetails.userName}
                onChange={handleChange}
                placeholder='John Doe' />
              <label htmlFor="registerUsername">Username</label>
            </div>

            <div className="form-floating mb-4">
              <input type="email" id="registerEmail" className="form-control" name='email' value={userDetails.email}
                onChange={handleChange}
                placeholder="name@example.com" />
              <label htmlFor="registerEmail">Email</label>
            </div>

            <div className="form-floating mb-4">
              <input type="password" id="registerPassword" className="form-control" name='password' value={userDetails.password}
                onChange={handleChange} placeholder='password' />
              <label htmlFor="registerPassword">Password</label>
            </div>

            <div className="form-floating mb-4">
              <input type="password" id="registerRepeatPassword" className="form-control" name='confirmPassword' value={userDetails.confirmPassword}
                onChange={handleChange}
                placeholder='repeat password' />
              <label htmlFor="registerRepeatPassword">Repeat password</label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
            </div>
          </form>
        </div>
      </div>
      </div>

    </>
  )
}

export default Registration