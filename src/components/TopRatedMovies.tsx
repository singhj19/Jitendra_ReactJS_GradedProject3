import React, { useEffect, useState } from "react";
import IMovie from "../models/IMovie";
import MovieItem from "./Common/MovieItem";
import { Alert, Row, Col } from "react-bootstrap";
import LoadingIndicator from "./Common/LoadingIndicator";
import { LoadingStatus } from "../models/types";
import { getMovies } from "../services/movies";

type Props = {
  searchQuery: string; // Receive the search query from App.tsx
};

const TopRatedMovies: React.FC<Props> = ({ searchQuery }) => {
  const [status, setStatus] = useState<LoadingStatus>("LOADING");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies("top-rated-movies"); // Call the API to fetch movies in theaters
        setMovies(data || []);
        setStatus("LOADED");
      } catch (error) {
        setError(
          error instanceof Error
            ? error
            : new Error("An unknown error occurred")
        );
        setStatus("ERROR_LOADING");
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateFavourites = () => {};

  let el;
  switch (status) {
    case "LOADING":
      el = (
        <LoadingIndicator
          size="large"
          message="Fetching movies, please wait..."
        />
      );
      break;
    case "LOADED":
      el =
        filteredMovies.length > 0 ? (
          <>
          <Row className="ms-4 pt-1 pb-1"><h5>Movies</h5></Row>
          <Row
            xs={1}
            sm={2}
            md={3}
            lg={6}
            xl={8}
            className="g-4"
            style={{ width: "100%", margin: "0", padding: "0" }}
          >
            {filteredMovies.map((movie) => (
              <Col
                key={movie.id}
                className="d-flex align-items-stretch"
                style={{ padding: "0", height: "100%" }}
              >
                <MovieItem
                  movie={movie}
                  filter="top-rated-movies"
                  favourites={new Set<string>()} // Pass an empty set for favourites
                  updateFavourites={updateFavourites} // Pass the no-op function
                />
              </Col>
            ))}
          </Row>
          </>
        ) : (
          <Alert variant="warning">No movies found matching your search.</Alert>
        );
      break;
    case "ERROR_LOADING":
      el = <Alert variant="danger my-3">{error?.message}</Alert>;
      break;
    default:
      el = null;
      break;
  }

  return el;
};

export default TopRatedMovies;
