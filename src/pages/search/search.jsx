import React, {useState, useEffect} from 'react';
import {Row, Col, Input} from 'antd';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import MovieCatalog from '../../components/MovieCatalog';
import Footer from '../../components/Footer';
import {URL_API, API} from '../../utils/constants';

import './search.scss';

function Search(props) {
    /* console.log('Props: ', props); */
    const {location, history} = props; // extraigo las propiedades existentes de props llamadas location y histori
    const [movieList, setMovieList] = useState([]); // dos estados, uno normal y el que actualiza
    const [searchValue, setSearchValue] = useState('');

    // se ejecuta una funcion asincrona que hace una peticion http a themoviedb para sacar las peliculas relacionadas con la busqueda
    useEffect(() => { 

        (async () => {
            const searchValue = queryString.parseUrl(location.search); // Para que sirve esto? para sacar los resultados de una pelicula ejemplo:
            // http://localhost:3000/search?s=joker ponemos este link y nos deberia de salir pelis relacionadas a joker
            // si ponemos el cnosole log de location o de location.search como aca arriba nos saldra el string d joker, pero necesitamos
            // traer el valor de joker, para eso utilizamos queryString.parseUrl. Si hacemos un console.log de esto nos saldra
            // entonces un objeto llamado s de search que sera igual a nuestra busqueda
            // Para mas ejemplo podemos agregar otros parametros a parte de la s de search, como asi: /search?s=joker&name=rodrigo
            // y en el objeto nos saldra s: joker y name: rodrigo

            /* console.log(queryString.parseUrl(location.search)); */

            // ahora, entonces sabemos que search value devolverá ese objeto y necesitamos sacar joker de s:
            // entonces haciendo uso del destructuring queremos sacar S de query, y como query esta dentro de searchValue:
            const {s} = searchValue.query;
            // ahora podemos hacer un consle log de s para ver si sale joker

            /* console.log(s); */

            // ahora ya podemos hacer la peticion http con fecth usando la var response. La peticion se hará obviamente a themoviedb
            const response = await fetch(
                `${URL_API}/search/movie?api_key=${API}&language=es-ES&query=${s}&page=1` // lo que va a buscar(query=) será nuestra const S de search
            )
                // Podemos hacer un log ahora de la respuesta para ver como va. 
                // Recordar que si no metemos todo el programa en una funcion asincrona (async) y ponemos el await en el fetch solo nos devolvera una promesa
                // Siempre que haya una peticion debe haber un await, en una funcion asincrona
            /* console.log(response); */
            // si nos da un status 200 significa que esta todo bien, entonces podemos pasar nuestro archivo a JSON para ver como está escrito todo *-*
            // *-* y ponemos como console log a la nueva constante (movies) una vez hayamos transformado el json
            // recorda que como es una peticion debe haber un await
            const movies = await response.json();
            /* console.log(movies); */
            // Si todo marcha de maravilla entonces tenemos que guardar el resultado(results) en un estado(setmovielist)
            setSearchValue(s); // le pasamos al estado setSearchValue la S para que se actualize cada vez que cambie la s
            setMovieList(movies); // le pasamos al estado setMovieList movies para que se actualize cada vez que cambie la movies

            // Por ultimo solo toca renderizar las peliculas en el return
        })()
    }, [location.search]); // variable actualizable que determine si se actualiza el useEffect o no. Si esta variable es modificada el Effect se vuelve e ejecutar


    // Funcion para actualizar el input search para poder cambiar la busqueda

    const onChangeSearch = e => { // hacemos una funcion para cambiar el search, esta funcion que ejecutara en el input entonces lo escribimos alli
        /* console.log(e);  con este console podremos observar que si clickeamos en el search y escribimos algo nos saldra un evento*/
        // entonces tenemos que ir al target: input que sale alli
        /* console.log(e.target);  y nos saldra el input, entonces solo falta acceder al input */
        /* console.log(e.target.value); */ // teniendo esto, solo faltara actualizar este valor

        // Tenemos que capturar lo que se busca como por ejemplo joker
        // PARAMETROS DE LA URL
        const urlParams = queryString.parse(location.search); 
        // si hacemos un console log de urlParams nos saldra s= joker, Ya tenemos lo q queremos cambiar
        /* console.log(urlParams.s); */
        // ACTUALIZAR PARAMETROS DE LA URL
        urlParams.s = e.target.value; // Entonces declaramos a url params como el valor que posee s es decir joker
        /* console.log(urlParams);  con este console puedo observar que ahora cada vez que escribo se me actualizara. Solo debo actualizarlo ahroa en el input*/
        // gracias al withRouter podemos llamar a history, y ponerle un push para que metra los nuevos caracteres. Con el template string `` 
        // metemnos nuestra const de urlParams .stringfy y le pasamos la constante
        // REFRESCAR LA URL
        history.push(`?${queryString.stringify(urlParams)}`);
        // ahora solo nos quedaria actualizar la variabvle setSearchValue pasandole el valor
        // ACTUALIZAR EL ESTADO DEL VALOR DEL BUSCADOR
        setSearchValue(e.target.value);
    };

    return (
        <Row>
            <Col span={12} offset={6} className="search">
                <h1>Busca una película</h1>
                <Input value={searchValue} onChange={onChangeSearch} /> {/* el valor que buscamos se lo pasamos como valor, en este caso es searchValue */}
            </Col>
            {/* lista de peliculas, reutilizamos el catalogo */}
            {movieList.results && ( /* si las listas de pelicula tiene un resultado entonces */
                <Row>
                    <MovieCatalog movies={movieList} /> {/* finalmente al catalogo de peliculas le pasamos la constante que trae el json, es decir,  */}
                    {/* movies. Y a esta le pasamos la lista de peliculas que ya fue determinada en el estado para que se actualize la lista de peliculas
                    mediante la buscaqueda */}
                </Row>
            )}
            <Col span={24}>
                <Footer className="navbar navbar-fixed-bottom" />
            </Col>
        </Row>
    );
}

export default withRouter(Search); // Exportamos nuestro componente, pero envolviendolo con el withRouter. Esto hará que nuestro objeto tenga:
// history, location, match, staticContext. Entonces si ahora que se que tiene dentro estos elementos, puedo extraer algunos de props, como location