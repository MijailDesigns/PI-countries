import React from 'react';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries, orderBy } from '../../redux/actions';
import CardCountry from '../CardCountry/CardCountry';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import './Home.css'

const Home = () => {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const loading = useSelector(state => state.loading);

    let [search, setSearch] = useState({
        name: "",
        continent: "",
        activity: ""
    });

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    let last = 9 + ((currentPage - 1) * itemsPerPage);
    let first = last - itemsPerPage;
    let countriesToRender = countries.slice(first, last)

    const changeItemsPerPage = (currentPage) => {
        if (currentPage === 1) {
            setItemsPerPage(9);
        }else{
            setItemsPerPage(10);
        }
    }
    
    const[orden, setOrden] = useState ('');

    useEffect(() => {
        //dispatch(getCountries(search));
        changeItemsPerPage(currentPage)
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1)
        dispatch(getCountries(search))
        
    }, [dispatch, search]);

    console.log(countries)
    // console.log(countries.length)
    // // console.log(countriesToRender)
    // console.log(currentPage, 'page')
    // console.log(first, last)
    // //console.log(countries.slice(0, 20))

    function handleSort (e) {
        e.preventDefault();
        setCurrentPage(1); // cuando hago el ordenamiento lo hago desde la pagina 1, 
        dispatch(orderBy(e.target.value));
        
        setOrden(`Ordenado ${e.target.value}`) // setOrden es un estado local que en un inicio va a estar vacio, para cuando seteo en la pagina 1, me modifica el estado local y renderiza
    };
    


  return (
    <>
        <Filter search={search} setSearch={setSearch} countries={countries} setCurrentPage={setCurrentPage}  handleSort={handleSort}/>
        <Pagination countries={countries} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className='grid-container'>
            {loading ? (
                <img 
                    src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921'
                    alt='Cargando..'
                />
            ) : (
                countriesToRender?.map((el, index) => {return(
                    <Fragment key={index}>
                            <CardCountry 
                                key={index} 
                                id={el.id}
                                name={el.name}
                                flag={el.flag}
                                continent={el.continent} 
                            />
                    </Fragment>
                )})
            )}
        </div>
    </>
  )
}

export default Home