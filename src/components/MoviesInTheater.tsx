import React from 'react';
// import { Route, Routes } from 'react-router-dom';
import MovieList from './Common/MovieList';
// import MovieDetails from './MovieDetails';

const MoviesInTheater: React.FC = () => {
    return (
        // <Routes>
        //     <Route path="/" element={<MovieList filter="movies-in-theaters" />} />
        //     {/* <Route path="/movies/movies-in-theaters/:id" element={<MovieDetails/>} /> Movie details route */}
        // </Routes> 

        
            <MovieList filter='movies-in-theaters'></MovieList>  
        
    );
};

export default MoviesInTheater;