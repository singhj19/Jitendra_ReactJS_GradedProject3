import React from 'react';
import MovieList from './Common/MovieList';
// import { useLocation } from 'react-router-dom';

const TopRatedMovies: React.FC = () => {
    return (
        <MovieList filter='top-rated-movies'></MovieList>  
    );
};

export default TopRatedMovies;