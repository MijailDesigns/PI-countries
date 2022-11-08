import React from 'react'
import './CountryDetail.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCountryDetail } from '../../redux/actions';

const CountryDetail = (props) => {

    const {id} = useParams();
    console.log(id);

    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail);
    useEffect(() => {
        return dispatch(getCountryDetail(id))
    }, [])


  return (
    <div className='detailContainer'>
        <div className='flag'>
            <img src={detail.flag} alt={detail.name} style={{height: '450px'}}/>
        </div>
        <div>
            <h1>{detail.name} ({detail.id})</h1>
            <h3>Capital: {detail.capital}</h3>
            <h3>Subregion: {detail.subregion}</h3>
            <h3>Area: {detail.area} km<sup>2</sup></h3>
            <h3>Population: {detail.population}</h3>
            <h3>Tourist Activities: </h3>
            <ul>
                {detail.activities?.map(el => {return(
                    <>
                        <li>{el.name}</li>
                        <p>Difficulty: {el.difficulty}</p>
                        <p>Duration: {el.duration}</p>
                        <p>Season: {el.season}</p>
                    </>)
                })}
            </ul>
        </div>
        
    </div>
  )
}

export default CountryDetail