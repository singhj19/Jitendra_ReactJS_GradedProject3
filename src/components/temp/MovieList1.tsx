// import React, { useState, useEffect } from 'react';
// import { Alert, Row, Col } from 'react-bootstrap';
// import LoadingIndicator from './Common/LoadingIndicator';
// import MovieItem from './MovieItem';
// import { LoadingStatus } from '../models/types';
// import IMovie from '../models/IMovie';
// import { getMovies } from '../services/movies';
// import axios from 'axios';

// type Props = {
//     filter: string;
// };

// const MovieList: React.FC<Props> = ({ filter }) => {
//     const [status, setStatus] = useState<LoadingStatus>('LOADING');
//     const [movies, setMovies] = useState<IMovie[]>([]);
//     const [error, setError] = useState<Error | null>(null);
//     const [favourites, setFavourites] = useState<Set<string>>(new Set());

//     const fetchMovies = async () => {
//         try {
//             const data = await getMovies(filter);
//             setMovies(data || []);
//             setStatus('LOADED');
//         } catch (error) {
//             setError(error instanceof Error ? error : new Error('An unknown error occurred'));
//             setStatus('ERROR_LOADING');
//         }
//     };

//     const updateFavourites = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/favourites`);
//             setFavourites(new Set(response.data.favourites));
//             fetchMovies();  // Re-fetch the movies after updating favourites
//         } catch (error) {
//             console.error('Error fetching favourites:', error);
//         }
//     };

//     useEffect(() => {
//         fetchMovies();
//     }, [filter]);

//     let el;
//     switch (status) {
//         case 'LOADING':
//             el = <LoadingIndicator size="large" message="Fetching movies, please wait..." />;
//             break;
//         case 'LOADED':
//             el = (
//                 <Row xs={1} sm={2} md={3} lg={6} xl={8} className="g-4" style={{ width: '100%', margin: '0', padding: '0' }}>
//                     {movies.map(movie => (
//                         <Col key={movie.id} className="d-flex align-items-stretch" style={{ padding: '0', height: '100%' }}>
//                             <MovieItem 
//                                 movie={movie} 
//                                 filter={filter} 
//                                 favourites={favourites} 
//                                 updateFavourites={updateFavourites}
//                             />
//                         </Col>
//                     ))}
//                 </Row>
//             );
//             break;
//         case 'ERROR_LOADING':
//             el = <Alert variant="danger my-3">{error?.message}</Alert>;
//             break;
//         default:
//             el = null;
//             break;
//     }

//     return el;
// };

// export default MovieList;
