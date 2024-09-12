import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import MovieItem from "./Common/MovieItem";
import IMovie from "../models/IMovie";
import axios from "axios";

type Props = {
  searchQuery: string;
};

const Favourites: React.FC<Props> = ({ searchQuery }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [favourites, setFavourites] = useState<Set<string>>(new Set());

  // Fetch movies from favourites API or other source
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/favourite`
        );
        const fetchedMovies: IMovie[] = response.data || [];
        setMovies(fetchedMovies);

        // Ensure that the favourite IDs are strings
        const favIds = new Set<string>(
          fetchedMovies.map((movie: IMovie) => movie.id)
        );
        setFavourites(favIds);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);

  useEffect(() => {
    console.log("Movies:", movies); // Ensure movies state is updated
  }, [movies]);

  const updateFavourites = async (movieId: string) => {
    // Optimistically remove the movie from the list before making the API call
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));

    try {
      // Send request to remove the movie from the favourites
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/favourites/${movieId}`
      );

      // Re-fetch the favourites after removal
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/favourites`
      );
      const fetchedMovies: IMovie[] = response.data || [];
      setMovies(fetchedMovies);

      // Ensure that the favourite IDs are strings
      const favIds = new Set<string>(
        fetchedMovies.map((movie: IMovie) => movie.id)
      );
      setFavourites(favIds);
    } catch (error) {
      console.error("Error updating favourites:", error);
    }
  };

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Row className="ms-4 pt-1 pb-1">
        <h5>Favouites</h5>
      </Row>
      <Row xs={1} sm={2} md={3} lg={6} xl={8} className="g-4">
        {filteredMovies.map((movie) => (
          <Col key={movie.id}>
            <MovieItem
              movie={movie}
              filter="favourite"
              favourites={favourites}
              updateFavourites={() => updateFavourites(movie.id)} // Pass the movie ID for removal
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Favourites;
