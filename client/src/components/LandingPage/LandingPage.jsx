import React from 'react';
import './LandingPage.css'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='landing'>
        <div className='landing-container2'>
          <h2>Welcome to Countries of the World, it's the individual project for the Henry's bootcamp, it's a single page application that shows you all the countries around the world and information about them, you will be able to create activities and associate it to one country or many of them.</h2>
          <Link to='/home'><button className='button'>Let's explore</button></Link>
        </div>
        <div className='landing-container1'></div>
        
        
    </div>
  )
}

export default LandingPage;