import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications';


const Home = ({editable=true}) => {

  // Initialize the navigation function from React Router
  const navigate = useNavigate();
  
  // Retrieve user details from local storage
  const storedUserDetails = localStorage.getItem('userDetails');
  
  // State to hold user details with initial values
  const [userDetails, setUserDetails] = useState({
  
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Check if storedUserDetails is not null before parsing
    console.log(editable);
    if (storedUserDetails !== null) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
      // If user details are not present, navigate to the registration page
      navigate('/registration');
    }
  }, [storedUserDetails, navigate]);

  console.log(storedUserDetails);

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the password and confirmPassword match
    if (userDetails.password === userDetails.confirmPassword) {
      // Store user details in local storage
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      // Navigate to the home page
      NotificationManager.success('Success message', 'User details updated');
      navigate('/');
    } else {
      // If passwords do not match, navigate to the editdetails page
      NotificationManager.error('Error message', 'repeat password do not match')
      navigate('/editdetails');
    }
  };

  return (
    <>
    <NotificationContainer/>
    <div className='registration-page rounded-4 border border-2 bg-body-tertiary w-75 mx-auto px-5 my-4 py-3'>

        {editable ? <h2 className='mb-4 text-center'>Edit Profile</h2> : <h2 className='mb-4 text-center'>Profile</h2>}
        <div className="tab-pane" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
        <form onSubmit={handleSubmit}>


            <div className="form-floating mb-4">
            <input readOnly={!editable} type="text" id="registerUsername" className="form-control" name='userName' placeholder='John Doe' 
            onChange={handleChange} value={userDetails.userName} />
            <label htmlFor="registerUsername">Username</label>
            </div>

            <div className="form-floating mb-4">
            <input readOnly={!editable} type="email" id="registerEmail" className="form-control" name='email' onChange={handleChange} value={userDetails.email} placeholder="name@example.com"/>
            <label htmlFor="registerEmail">Email</label>
            </div>


            <div className="form-floating mb-4">
            <input readOnly={!editable} type="password" id="registerPassword" className="form-control" name='password' onChange={handleChange} value={userDetails.password} placeholder='password'/>
            <label htmlFor="registerPassword">Password</label>
            </div>

            {editable && 
            <div className="form-floating mb-4">
              <input readOnly={!editable} type="password" id="registerRepeatPassword" className="form-control" onChange={handleChange} value={userDetails.confirmPassword} name='confirmPassword' placeholder='repeat password' />
              <label htmlFor="registerRepeatPassword" className='text-wrap'>Repeat password</label>
            </div>}
            <div className="text-center">
            {editable ? <button type="submit" className="btn btn-primary btn-block mb-4">Save</button> :
                        <Link to={'/editdetails'} className="btn btn-primary btn-block mb-4">Update</Link>
            }
            </div>
        </form>
        </div>
    </div>
    </>
  )
}

export default Home