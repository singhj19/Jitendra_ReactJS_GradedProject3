import React from 'react';
import MovieList from './Common/MovieList';
// import { useLocation } from 'react-router-dom';

const TopRatedIndian: React.FC = () => {
    return (
        <MovieList filter='top-rated-india'></MovieList>  
    );
};

export default TopRatedIndian;