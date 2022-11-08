import React from 'react'
import './Activities.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities, deleteActivity } from '../../redux/actions';
import ActivityCard from '../ActivityCard/ActivityCard';

const Activities = () => {

    const activities = useSelector(state => state.activities);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch, activities])

    const handleDelete = (e) => {
        dispatch(deleteActivity(e.target.id)); 
        dispatch(getActivities())
    }

    //console.log(activities);

  return (
    <div className='flex-container'>
        {activities.map((el, index) => {
            return(
                <ActivityCard handleDelete={handleDelete} id={el.id} name={el.name} difficulty={el.difficulty} duration={el.duration} season={el.season} countries={el.countries} />
            )
        })}
    </div>
  )
}

export default Activities