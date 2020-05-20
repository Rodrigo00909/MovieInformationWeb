import React, {useState, useEffect} from 'react';
import {Row, Col} from 'antd';
import {URL_API, API} from '../utils/constants';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import MovieCatalog from '../components/MovieCatalog';
import Pagination from '../components/Pagination';

export default function NewMovies() {
    const [movieList, setMovieList] = useState([]);
    // Quiero hacer una paginacion entonces necesito una variable o estado que me diga en que pagina estamos actualmente
    // page: pagina en la que estamos, setPage: actul de la pagina
    const [page, setPage] = useState(1); // empezamos con la pagina numero 1
    // peticion http con useEffect. No es necesario usar el useFecth, se puede variar

    useEffect(() =>{ // Función asincrona xq hasta que las pelis no carguen no tenemos que mostrar nada (loading)
        (async () => {
            const response= await fetch( // hacemos una peticion fetch
                `${URL_API}/movie/now_playing?api_key=${API}&lenguage=es-ES&page=${page}`
            );
            const movies = await response.json();
            // console.log(movies); Podemos usar este console para ver como va nuestra estructura
            setMovieList(movies); // y si va todo bien lo ejecutamos
        })();
    }, [page]); // cuando page se actualize, se va a volver a actualizar

    /* console.log(movieList.results); */ // con esto podemos terminar de ver nuestra lista 

    // FUNCION PARA ACTUALIZAR LA PAGINA ( UNA VEZ HECHO Pagination.jsx)

    const onChangePage = page => { // recibe la pagina
        setPage(page); // y le pasamos la pagina que nos llega a setPage
    }

    // Esto funciona ya que el onChange de Pagination.jsx recibe una pagina cuando hay un cambio (entre 1-2-3-4). Todo esto lo hace el componente solo.
    // Simplemente agarramos la pagina que nos llega de onchange y , arriba le dijimos con el useEffect que cada vez que se produzca un cambio en page se ac
    // actualize
    

    return ( // Creamos la estrctura, agregamos el loading y hacemos un IF para mostrar las pelis
        // dentro del if pongo mi componente MovieCatalog, y le paso mis peliculas que estaban cargadas en 
        // el estado movieList
        <Row>
            <Col span="24" style={{ textAlign: "center", marginTop: 25 }}>
                <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
                    Últimos Estrenos
                </h1>
            </Col>
            {movieList.results ? (
                <Row>
                     <MovieCatalog movies={movieList}/>
                    <Col span="24">
                        <Pagination /* dentro del componente pagination quien hara el cambio de paginas (1-2-3-4) irán algunas propiedades: */
                            currentPage={movieList.page} /* llamo al current page de Pagination.jsx y le paso movieList.page que contiene la pagina */
                            totalItems={movieList.total_results} /* llamo al total y le paso los resultados totales */
                            onChangePage={onChangePage} /* Y para finalizar le pasamos el cambio */
                        />
                    </Col>
                </Row>
               
            ) : (
                <Col span="24">
                    <Loading />
                </Col>
            )}
            <Col span={24}>
                <Footer />
            </Col>
        </Row>
    );
}