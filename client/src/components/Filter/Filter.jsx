import React from 'react';
// import { useDispatch } from 'react-redux';
// import { useState } from 'react';
// import { orderBy } from '../../redux/actions';




const Filter = ({search, setSearch, countries, setCurrentPage, handleSort}) => {
    //order
    // const [order, setOrder] = useState("");
    // const dispatch = useDispatch()
    

    // function handleSort (e) {
    //     e.preventDefault();
    //     setCurrentPage(1); 
    //     setOrder(`${e.target.value}`) 
    //     dispatch(orderBy(e.target.value));
        
    // };

    function handleChange(e) {
        setSearch({
          ...search,
          [e.target.name]: e.target.value
        });
      };

    let resultCountries = Array.from(new Set(countries.map(el => el.continent)))
    
    let result = []
    countries.map(el => {
        if (el.activities.lenght !== 0) {
            el.activities.map(el => result.push(el.name))
        }
    })

    //console.log(Array.from(new Set(result)));

  return (
    <div>
        <form>
            <input type='text' name='name' placeholder="Search by country's name"
            onChange={handleChange} />

            <label>Continent</label>
            <select name='continent' onChange={e => handleChange(e)}>
                <option value="" selected={search.continent === "" ? true : false}>All</option>
                {resultCountries.map((g, index) => 
                    <option key={index}  value={g} selected={search.continent === g ? true : false} >{g}</option>  
                    )}
            </select>

            <label>Tourist Activity</label>
            <select name='activity' onChange={e => handleChange(e)}>
                <option value="" selected={search.activity === "" ? true : false}>All</option>
                {Array.from(new Set(result)).map((g, index) => 
                    <option key={index}  value={g}  selected={search.activity === g ? true : false} >{g}</option>  
                    )}
            </select>

            <label>Order by country's name</label>
            <select onChange={e => handleSort(e)}>
                <option value="">All</option>
                <option value="ascAlp">A-Z</option>
                <option value="descAlp">Z-A</option>
            </select>

            <label>Order by population</label>
            <select onChange={e => handleSort(e)}>
                <option value="">All</option>
                <option value="ascPop">0-9</option>
                <option value="descPop">9-0</option>
            </select>
        </form>
    </div>
  )
}

export default Filter