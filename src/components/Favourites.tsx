import React from 'react';
import MovieList from './Common/MovieList';

const Favourites: React.FC = () => {    
    return (
        <MovieList filter='favourite'></MovieList>  
    );
};

export default Favourites;