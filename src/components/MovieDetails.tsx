import React, {useState, useEffect} from 'react';
import LoadingIndicator from './Common/LoadingIndicator';
import { LoadingStatus } from '../models/types';
import IMovie from '../models/IMovie';
import { Alert, Row, Col } from "react-bootstrap";
import { getMovieById } from "../services/movies";
import { useParams } from 'react-router-dom';

type Props = {
    // id: string
    // filter: string
};

const MovieDetails = (props : Props) => {
    const { filter, id } = useParams<{ filter: string, id: string }>(); // Get the movie ID from the URL params
    const [status, setStatus ] = useState<LoadingStatus>('LOADING');
    const [movie, setMovie ] = useState<IMovie | null>( null );
    const [error, setError ] = useState<Error | null>( null );

    let el;
    // let getMovie: IMovie;

    // const fetchMovie = async () => {
    //     setTimeout( async () => {
    //         const getMovie = await getMovieById(props.filter, props.id);
    //         setMovie(getMovie);
    //         setStatus('LOADED');
    //     }, 3000);
    // }

    // useEffect(() => {
    //     fetchMovie()
    // }, []);

    useEffect(
        () => {
        const fetchMovie = async () => {
            try{
                const getMovie = await getMovieById( filter! , id! );
                setMovie(getMovie);
                setStatus('LOADED');
            } catch(error) {
                setError(error instanceof Error ? error : new Error('An unknown error occurred'));
                setStatus('ERROR_LOADING');
            }           
        }
        fetchMovie();
    }, [filter, id]);

    switch (status) {
        case 'LOADING' :
            el = (
                <LoadingIndicator size="large" 
                message="we are fetching details of movie. Please wait..."
                />
            );
            break;
        case 'LOADED' :
            el = (
                <Row>
                    <Col xs={12} lg={4}>
                        <img src={movie?.posterurl}/>
                    </Col>
                    <Col xs={12} lg={8}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Illum ipsum obcaecati cum incidunt tempore a reiciendis nostrum, aperiam nam iste vel doloribus dignissimos fugiat magni debitis asperiores perferendis id aut.
                    </Col>                    
                </Row> 
            );
            break;    
        case 'ERROR_LOADING' :
            el = <Alert variant="danger my-3">{error?.message}</Alert> ;
            break;               
        default:
            el = null;
            break;
    }            
    return el;    
}

export default MovieDetails;