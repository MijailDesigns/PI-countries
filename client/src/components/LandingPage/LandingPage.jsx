import React from 'react';
import './LandingPage.css'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='landing'>
        <h1>LandingPage</h1>
        <Link to='/home'><button>Ingresar</button></Link>
    </div>
  )
}

export default LandingPage;