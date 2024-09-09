import React from 'react';
import MovieList from './Common/MovieList';

type Props = {}

const ComingSoon: React.FC<Props> = () => {  

    return (
        <MovieList filter='movies-coming'></MovieList>  
    );
};

export default ComingSoon;