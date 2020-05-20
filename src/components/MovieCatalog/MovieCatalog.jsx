import React from 'react';
import { Col, Card } from 'antd';
import { EyeOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

import './MovieCatalog.scss';

export default function MovieCatalog(props) {
    // los props que recibe son las peliculas
    const {movies: {results}} = props; // traemos las peliculas, que seran igual a props ( lo que recibira el componente )
    // hacemos doble destructuring ya que si nos fijamos en movies (console.log(movies)) aparecerá un objeto con dates, pague, results, etc
    // haciendo doble destructuring tengo que agarrar los resultados. Pero otra manera de hacerlo es ir a new-movies.jsx y en vez de escribir
    // <MovieCatalog movies={movieList}/> ponemos <MovieCatalog movies={movieList.results}/>

    // Para el return, necesitamos renderizar pelocula por pelicula, si pusiera una sola columna solo me traera una pelicula. Para corregirlo
    // podria usar un bucle, un mapeo de results.

   return results.map(movie => ( // cada resultado me devuelve una pelicula
        <Col key={movie.id} xs={4} className="movie-catalog">
            <MovieCard movie={movie} />
        </Col>
   )); 
}

function MovieCard(props) {
    const {movie: {id, title, poster_path}} = props;
    const {Meta} = Card;
    const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;
    /* console.log(movie); */
    return (
      <Link to={`/movie/${id}`}>
          <Card 
            hoverable 
            style={{width: 240}} 
            cover={<img alt="{title}" 
            src={posterPath} />} 
            actions={[<EyeOutlined />]} >
              <Meta title={title} />
          </Card>
      </Link>  
    );
}