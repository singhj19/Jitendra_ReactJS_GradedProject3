// import React, { useState } from 'react';
// import { Card } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { faRectangleXmark } from '@fortawesome/free-regular-svg-icons';
// import { Link } from 'react-router-dom';
// import IMovie from '../models/IMovie';
// import { addToFavourite, removeFromFavourite, isAvailableinFavourites } from '../services/movies';
// import axios from 'axios';

// type Props = {
//     movie: IMovie,
//     filter: string,
//     favourites: Set<string>,
//     updateFavourites: () => void
// };

// const MovieItem: React.FC<Props> = ({ movie, filter, favourites, updateFavourites }) => {
//     const { id, title, posterurl } = movie;
//     const isFavourite = favourites.has(id);
//     const [isUpdating, setIsUpdating] = useState(false);

//     const handleFavouriteClick = async () => {
//         try {
//             if (filter === 'favourite') {
//                 await removeFromFavourite(id);
//                 alert('Removed from favourites');
//             } else {
//                 // Check if the movie is already in favourites
//                 try {
//                     const status = await isAvailableinFavourites(id);
//                     if (status === 200) {
//                         alert('Already added to favourites');
//                     }
//                 } catch (error) {
//                     // If a 404 error occurs, it means the movie is not in favourites yet
//                     if (axios.isAxiosError(error) && error.response?.status === 404) {
//                         await addToFavourite(movie);
//                         alert('Added to favourites');
//                     } else {
//                         throw error; // Re-throw other errors
//                     }
//                 }
//             }
//             updateFavourites(); // Refresh the favourites state
//         } catch (error) {
//             console.error('Error updating favourites:', error);
//         } finally {
//             setIsUpdating(false);
//         }
//     };


//     return (
//         <Card style={{ width: '25rem', margin: '10px', height: '100%' }} className="d-flex flex-column">
//             <Link to={`/${filter}/${id}`}>
//                 <Card.Img variant="top" src={posterurl} style={{ height: '15rem', objectFit: 'cover' }} />
//             </Link>
//             <Card.Body className="d-flex flex-column justify-content-between">
//                 <Card.Title className="text-start" style={{ fontSize: '1.2rem' }} >{title}</Card.Title>
//                 <Card.Text className="text-start" style={{ fontSize: '0.9rem', color: 'gray' }}>
//                     <button onClick={handleFavouriteClick} className="btn btn-link p-0" disabled={isUpdating}
//                         style={{ fontSize: '0.8rem', display: 'inline-flex', justifyContent: 'left', alignItems: 'left', textDecoration: 'none', color: 'gray', }}
//                     >
//                         {
//                             filter === 'favourite'
//                                 ? (
//                                     <>
//                                         Remove from Favourites&nbsp; <FontAwesomeIcon icon={faRectangleXmark} />
//                                     </>
//                                 )
//                                 : (
//                                     <>
//                                         Add to Favourites&nbsp; <FontAwesomeIcon icon={faHeart} className="text-red" />
//                                     </>
//                                 )
//                         }
//                     </button>
//                 </Card.Text>
//             </Card.Body>
//         </Card>
//     );
// };

// export default MovieItem;
