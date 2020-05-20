import React, {useState} from 'react';
import {Row, Col, Button} from 'antd';
import { YoutubeOutlined, LeftSquareOutlined  } from '@ant-design/icons';
import {useParams} from 'react-router-dom';
import moment from 'moment';
import useFetch from '../../hooks/useFetch';
import { URL_API, API } from '../../utils/constants';
import Loading from '../../components/Loading';
import ModalVideo from '../../components/ModalVideo';

import './movie.scss';

// Componente de la foto de fondo

export default function Movie() {
    // Recuperar el id de la película
    const {id} = useParams();
    //  const id = params.id;  esto es lo mismo que esto  const {id} = params;
    // pero tambien podemos hacer un destructuring de  params = useParams es decir:
    // de esto  const params = useParams();  pasar a esto  const {id} = useParams();
    const movieInfo = useFetch(
        `${URL_API}/movie/${id}?api_key=${API}&language=es-ES`
        );
    if(movieInfo.loading || !movieInfo.result){
        return <Loading />;
    } 
    return <RenderMovie movieInfo={movieInfo.result} />;
}

// Componente contenedor

function RenderMovie(props) {
    // recuperamos la info de movie info
    const {movieInfo: {backdrop_path, poster_path}} = props;
    const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

    
    return (
        <div className="movie" style={{ backgroundImage: `url('${backdropPath}')`}}>
            <div className="movie__dark"/>
            <Row>
                <Col span={8} offset={2} className="movie__poster">
                    <PosterMovie image={poster_path} />
                </Col>
                <Col span={10} className="movie__info">
                    <MovieInfo movieInfo={props.movieInfo}/>
                </Col>
            </Row>
        </div>
    );
}

// Componente para la caratula
function PosterMovie(props) {
    const {image} = props;
    const posterPath = `https://image.tmdb.org/t/p/original${image}`;

    return <div style={{backgroundImage: `url('${posterPath}')` }} />;
}

// Componente para la información de la película

function MovieInfo(props) {
    const {movieInfo: {id, title, release_date, overview, genres, runtime}} = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const videoMovie = useFetch(
        `${URL_API}/movie/${id}/videos?api_key=${API}&language=en-EN`
    );

    const openModal = () => setIsVisibleModal(true);
    const closeModal = () => setIsVisibleModal(false);

    const renderVideo = () => {
        if(videoMovie.result) {
            if(videoMovie.result.results.length > 0) {
                return (
                    <>
                        <Button onClick={openModal}>
                            <YoutubeOutlined className="flecha-modal"/>Ver Trailer
                        </Button>
                        <ModalVideo 
                        videoKey={videoMovie.result.results[0].key} 
                        videoPlatform={videoMovie.result.results[0].site} 
                        isOpen={isVisibleModal} 
                        close={closeModal} 
                        />
                    </>
                )
            }
        }
    }

    return (
        <>
            <div className="movie__info-header">
                <h1>
                    {title}
                    <span>{moment(release_date, "YYYY-MM-DD").format ("YYYY")}</span>
                </h1>
            </div>
            <div className="movie__info-button">
                {renderVideo()}
            </div> 
            <div className="movie__info-content">
                <h3>General</h3>
                <p>{overview}</p>

                <p>Duración: {runtime} minutos.</p>

                <h3>Géneros</h3>
                <ul>
                    {genres.map(gender => (
                        <li key={gender.id}>{gender.name}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
