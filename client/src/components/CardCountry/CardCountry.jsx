import React from 'react'
import { Link } from 'react-router-dom'
import './CardCountry.css'

const CardCountry = ({id, name, flag, continent}) => {
  return (
    <div className='card'>
        <img src={flag} alt='bandera' />
        <h2>{name}</h2>
        <h3>{continent}</h3>
        <button className='button'><Link to={`/countryDetail/${id}`}>See Details</Link></button>
        
    </div>
  )
}

export default CardCountry