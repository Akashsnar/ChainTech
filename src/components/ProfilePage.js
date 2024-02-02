import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = (props) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    // Fetch user information from the backend upon component mount
    console.log(props);
    axios.get('http://localhost:5000/api/profile')
      .then(res => {
        setUser(res.data);
        setFormData({ email: res.data.email, password: '' });
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile information
    axios.put('http://localhost:5000/api/profile', formData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => {
        console.log(res.data);
        // Optionally, update state or show a success message
      })
      .catch(err => console.error(err));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
