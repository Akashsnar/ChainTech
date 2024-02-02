import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import ProfilePage from './components/ProfilePage';
import User from './components/User'
import {NotificationContainer, NotificationManager} from 'react-notifications';

const App = () => {
  return (
    <Router>
          <NotificationContainer/>
      <div>
        <Routes>
        <Route path="/" element={<RegistrationPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/registration" element={<RegistrationPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/home" element={<User/>} editable={false}/>
          <Route path='/editdetails' element={<User/>} key={'editdetails'} editable={true}/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
