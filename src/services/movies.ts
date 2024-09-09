import axios from 'axios';
import IMovie from "../models/IMovie";

const getMovies = (filter: string) => {
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/${filter}`)
    .then(response => response.data)
};

const getMovieById = (filter: string, id: string) => {
    return axios.get<IMovie>(`${process.env.REACT_APP_API_BASE_URL}/${filter}/${id}`)
        .then(response => response.data);
};

const addToFavourite = (movie: IMovie) => {
    return axios.post<IMovie>(`${process.env.REACT_APP_API_BASE_URL}/favourite`, movie)
    .then(response => response.status)
}

const removeFromFavourite = (movieId: string) => {
    return axios.delete<any>(`${process.env.REACT_APP_API_BASE_URL}/favourite/${movieId}`)        
};

const isAvailableinFavourites = (movieId: string) => {
    return axios.get<IMovie>(`${process.env.REACT_APP_API_BASE_URL}/favourite/${movieId}`)
    .then(respose => respose.status)
}

export {
    getMovies,
    getMovieById,
    addToFavourite,
    removeFromFavourite,
    isAvailableinFavourites
}
