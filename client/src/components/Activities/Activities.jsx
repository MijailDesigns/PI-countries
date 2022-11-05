import React from 'react'
import './Activities.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, deleteActivity } from '../../redux/actions';
import Modal from './Modal';

const Activities = () => {

    const activities = useSelector(state => state.activities);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false)

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch, activities])

    const handleShow = () => {
        setShow(true);
    }
      
    const handleHide = () => {
        setShow(false);
    }

    const handleDelete = (e) => {
        dispatch(deleteActivity(e.target.id)); 
        dispatch(getActivities())
    }

    //console.log(activities);

  return (
    <div>
        hola activities
        {activities.map((el, index) => {
            return(
                <div key={index} className='card'>
                    <h3>{el.name}</h3>
                    <h3>Difficulty: {el.difficulty}/5</h3>
                    <h3>Duration: {el.duration} hours</h3>
                    <h3>Season: {el.season}</h3>
                    <h3>Available Countries:</h3>
                    {/* {el.countries.map(el => <h3>{el.name}</h3>)}
                    <button className='button' onClick={() => {dispatch(deleteActivity(el.id)); dispatch(getActivities())}}>Delete</button>  */}
                    {el.countries.map(el => <h3>{el.name}</h3>)}
                    <button className='button' onClick={(e) => handleShow(e)}>Delete</button> 
                    {show && <Modal id={el.id} handleHide={handleHide} handleDelete={handleDelete} />}
                </div>
            )
        })}
    </div>
  )
}

export default Activities