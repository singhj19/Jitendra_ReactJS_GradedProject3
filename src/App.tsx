import React, { useState } from "react";
import "./App1.css";
import NavigationMenu from "./components/Common/NavigationMenu";
import { Route, Routes, useLocation, matchPath } from "react-router-dom";
import MoviesInTheater from "./components/MoviesInTheater";
import ComingSoon from "./components/ComingSoon";
import TopRatedIndian from "./components/TopRatedIndian";
import TopRatedMovies from "./components/TopRatedMovies";
import Favourites from "./components/Favourites";
import { Container } from "react-bootstrap";
import MovieDetails from "./components/Common/MovieDetails";
import NavigationMenuForDetails from "./components/Common/NavigationMenuForDetails";

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const isMovieDetailsPage = matchPath("/:filter/:id", location.pathname);

  return (
    <>
      {!isMovieDetailsPage ? (
        <NavigationMenu onSearch={handleSearch} searchQuery={searchQuery} />
      ) : (
        <NavigationMenuForDetails></NavigationMenuForDetails>
      )}

      <Container style={{ width: "100%", maxWidth: "100%" }}>
        <Routes>
          <Route
            path="/InTheater"
            element={<MoviesInTheater searchQuery={searchQuery} />}
          />
          <Route
            path="/ComingSoon"
            element={<ComingSoon searchQuery={searchQuery} />}
          />
          <Route
            path="/TopRatedIndian"
            element={<TopRatedIndian searchQuery={searchQuery} />}
          />
          <Route
            path="/TopRatedMovies"
            element={<TopRatedMovies searchQuery={searchQuery} />}
          />
          <Route
            path="/Favourites"
            element={<Favourites searchQuery={searchQuery} />}
          />
          <Route path="/:filter/:id" element={<MovieDetails />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
