import React from 'react';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getCountries, orderBy } from '../../redux/actions';
import CardCountry from '../CardCountry/CardCountry';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';
import './Home.css'

const Home = () => {

    // let location = useLocation();
    // console.log(location)

    let {search} = useLocation();
    let query = new URLSearchParams(search);
    console.log(query.toString());
    let name = query.get("name");
    let continent = query.get("continent");
    let activity = query.get("activity");
    let page = query.get("page");
    let order = query.get("order");
    

    console.log(order);

    let history = useHistory();
    // console.log(name, continent)
    // console.log(history)

    

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);
    const loading = useSelector(state => state.loading);

    let [searchN, setSearchN] = useState({
        name: name || "",
        continent: continent || "",
        activity: activity || ""
    });

    //pagination
    const [currentPage, setCurrentPage] = useState(5);
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
    
    const[orden, setOrden] = useState (order || 'default');

    // useEffect(() => {
    //     setCurrentPage(page || 1)
    //     dispatch(getCountries(searchN))
    // }, []);

    useEffect(() => {
        //dispatch(getCountries(search));
        changeItemsPerPage(currentPage)
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(Number(page)  || 1)
        dispatch(getCountries(searchN))
    }, [dispatch, searchN, page]);

    //console.log(countries)
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
        query.set(e.target.name, e.target.value)
        history.push({search: query.toString()})

    };
    


  return (
    <>
        <Filter searchN={searchN} setSearchN={setSearchN} countries={countries} setCurrentPage={setCurrentPage}  handleSort={handleSort}/>
        <Pagination countries={countries} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className='flex-container'>
            {loading ? (
                <img className='loading'
                    src='https://ftsamuelrobinson.files.wordpress.com/2015/02/planeta-gif-2b924d2.gif'
                    //src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921'
                    // src='https://www.google.com/imgres?imgurl=https%3A%2F%2Fftsamuelrobinson.files.wordpress.com%2F2015%2F02%2Fplaneta-gif-2b924d2.gif&imgrefurl=https%3A%2F%2Fftsamuelrobinson.wordpress.com%2Fplaneta-gif-2b924d2%2F&tbnid=ZlsGEQt7T5YlpM&vet=12ahUKEwj04J3FnZr7AhXZeTABHW7IAp8QMygAegUIARDjAQ..i&docid=OpeEkHMRnYJRlM&w=500&h=375&q=gif%20de%20planeta%20girando%20sin%20fondo&ved=2ahUKEwj04J3FnZr7AhXZeTABHW7IAp8QMygAegUIARDjAQ'
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