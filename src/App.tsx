import React from 'react';
// import logo from './logo.svg';
import './App1.css';
import NavigationMenu from './components/Common/NavigationMenu';
import { Route, Routes } from 'react-router-dom';
import MoviesInTheater from './components/MoviesInTheater';
import ComingSoon from './components/ComingSoon';
import TopRatedIndian from './components/TopRatedIndian';
import TopRatedMovies from './components/TopRatedMovies';
import Favourites from './components/Favourites';
import { Container } from 'react-bootstrap';
import MovieDetails from './components/MovieDetails';
// import CustomRoute from './components/CustomRoute';
// import IMovie from './models/IMovie';


/* const movie: IMovie = {
  "id": "1",
      "title": "Game Night",
      "year": "2018",
      "genres": [
        "Action",
        "Comedy",
        "Crime"
      ],
      "ratings": [
        2,
        10,
        1,
        10,
        6,
        2,
        5,
        2,
        9,
        7,
        5,
        3,
        7,
        7,
        1,
        4,
        5,
        9,
        2,
        8,
        10,
        8,
        1,
        10,
        7,
        10,
        8,
        6,
        7,
        6
      ],
      "poster": "MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
      "contentRating": "11",
      "duration": "PT100M",
      "releaseDate": "2018-02-28",
      "averageRating": 0,
      "originalTitle": "",
      "storyline": "A group of friends who meet regularly for game nights find themselves trying to solve a murder mystery.",
      "actors": [
        "Rachel McAdams",
        "Jesse Plemons",
        "Jason Bateman"
      ],
      "imdbRating": "",
      "posterurl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg"
} */

const App = () => {
  return (
    <>
      <NavigationMenu></NavigationMenu>
      <Container>
        <Routes>
          <Route path='/InTheater' Component={MoviesInTheater}></Route>
          <Route path='/ComingSoon' Component={ComingSoon}></Route>
          <Route path='/TopRatedIndian' Component={TopRatedIndian}></Route>
          <Route path='/TopRatedMovies' Component={TopRatedMovies}></Route>
          <Route path='/Favourites' Component={Favourites}></Route>
          <Route path="/:filter/:id" element={<MovieDetails/>} />
        </Routes>
      </Container>
    </>
  )
}

export default App;
