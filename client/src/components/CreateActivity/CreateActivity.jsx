import React from 'react'
import './CreateActivity.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addActivity, getCountriesForActivity, getActivities } from '../../redux/actions';

const CreateActivity = () => {

    const countries = useSelector(state => state.countriesInActivity);
    const activities = useSelector(state => state.activities)
    const dispatch = useDispatch();

    const navigate = useHistory();

    let activityName = activities.map(e => e.name);
    console.log(activityName);
    

    const [errors, setErrors] = React.useState({});

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: [],
    });

    const [lookFor, setLookFor] = useState("");

    function validate(input) {
        let errors = {};
        if (!input.name || input.name.length < 3 || !input.name.match( (/^[A-Za-z]+$/))) {
          errors.name = 'Activity name is required';
        }else if (activityName.some((e) => e.toLowerCase() === input.name.toLowerCase())) {
          errors.name = 'Name already exist';
        }else if(!input.difficulty){
          errors.difficulty = 'Difficulty is required';
        }else if(!input.duration){
          errors.duration = 'Duration is required';
        }else if(input.duration === 0){
            errors.duration = 'Duration is must be bigger than 0';
        }else if(!input.season){
            errors.season = 'Season is required';
        }else if(!input.country || input.country.length === 0){
            errors.country = 'Country is required';
        }

        return errors;
    };

    

    useEffect(() => {
        dispatch(getCountriesForActivity(lookFor));
        dispatch(getActivities());
    }, [lookFor])

   

    function handleChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
      };

    function handleClick(e) {
        setInput({
            ...input,
            country: [...input.country, e.target.alt]
        })

        setErrors(validate({
            ...input,
            country: [...input.country, e.target.alt]
        }))
    }

    function handleLook(e) {
        setLookFor(e.target.value);
      };

    function handleDelete(e) {
        setInput({
            ...input,
            country: input.country.filter((el) => el !== e),
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors(validate(input));
        if (Object.keys(errors).length === 0) {
            dispatch(addActivity(input))
            alert('Activity created successfully');
            setInput({
                name: '',
                difficulty: '',
                duration: '',
                season: '',
                country: []
                })
            navigate.push("/activities");
        }
        return;
    }

    // console.log(activities.map(e => e.name))

  return (
    <div className='container'>
        <div  style={{width: "70%"}}>
            <div className=''>
                <h2>Select countries</h2>
            </div>
            <div className='countries'>
                {countries?.map(c => <img src={c.flag} alt={c.name} style={{width: "auto", height: "50px", padding: "5px"}} onClick={e => handleClick(e)}/>)}
            </div>
            
        </div>
        <div style={{width: "30%"}}>
            <div className='createSection'>
                <h1>Create your activity</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label'>Which is the activity name?</label>
                    <br/>
                    <input className='inputs' type="text" value={input.name} name='name' placeholder='Activity name...' onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className='danger'>{errors.name}</p>
                    )}
                </div>
                
                <div>
                    <label className='label'>Difficulty</label>
                    <br/>
                    <select className='inputs' name='difficulty' onChange={e => handleChange(e)}>
                        <option  name="DEFAULT" disabled selected>Select Difficulty</option>
                        <option value="1" selected={input.difficulty === "1" ? true : false}>1</option>
                        <option value="2" selected={input.difficulty === "2" ? true : false}>2</option>
                        <option value="3" selected={input.difficulty === "3" ? true : false}>3</option>
                        <option value="4" selected={input.difficulty === "4" ? true : false}>4</option>
                        <option value="5" selected={input.difficulty === "5" ? true : false}>5</option>
                    </select> 
                    {errors.difficulty && (
                        <p className='danger'>{errors.difficulty}</p>
                    )}
                </div>
                
                <div>
                    <label className='label'>How long is going to take?</label>
                    <br/>
                    <input className='inputs' type="number" min={1} name='duration' placeholder='Select hours'  onChange={e => handleChange(e)}/>
                    {errors.duration && (
                        <p className='danger'>{errors.duration}</p>
                    )}
                </div>
                
                <div>
                    <label className='label'>Season</label>
                    <br/>
                    <select className='inputs' name='season' defaultValue={"DEFAULT"} onChange={e => handleChange(e)}>
                        <option  value="DEFAULT" disabled selected>Select Season</option>
                        <option value="Winter" name="Winter" selected={input.season === "Winter" ? true : false}>Winter</option>
                        <option value="Spring" name="Spring" selected={input.season === "Spring" ? true : false}>Spring</option>
                        <option value="Summer" name="Spring" selected={input.season === "Summer" ? true : false}>Summer</option>
                        <option value="Autumn" name="Spring" selected={input.season === "Autumn" ? true : false}>Autumn</option>
                    </select>
                    {errors.season && (
                        <p className='danger'>{errors.season}</p>
                    )}
                </div>

                <div>
                    <label className='label'>Which are the countries where is going to be available?</label>
                    <br/>
                    <input className='inputs' type='text' placeholder='Look for the country' onChange={handleLook} />
                    {input.country?.map((el, index) => <p>{el} <button 
                        type='button' 
                        onClick={() => handleDelete(el)}>X
                    </button>
                    </p>)}
                    {errors.country && (
                        <p className='danger'>{errors.country}</p>
                    )}
                </div>
                
                <button className='createBtn' type='submit'>Create Activity</button>
            </form>
            
        </div>
    </div>
  )
}

export default CreateActivity