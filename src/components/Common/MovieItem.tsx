import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import IMovie from "../../models/IMovie";
import {
  addToFavourite,
  removeFromFavourite,
  isAvailableinFavourites,
} from "../../services/movies";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  movie: IMovie;
  filter: string;
  favourites: Set<string>;
  updateFavourites: () => void;
};

const MovieItem: React.FC<Props> = ({
  movie,
  filter,
  favourites,
  updateFavourites,
}) => {
  console.log(movie);
  const { id, title, posterurl } = movie;
  const isFavourite = favourites.has(id);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFavouriteClick = async () => {
    try {
      if (filter === "favourite") {
        await removeFromFavourite(id);
        toast.success("Removed from favourites", { autoClose: 500 });
      } else {
        // Check if the movie is already in favourites
        try {
          const status = await isAvailableinFavourites(id);
          if (status === 200) {
            // alert('Already added to favourites');
            toast.error("Already added to favourites", { autoClose: 500 });
          }
        } catch (error) {
          // If a 404 error occurs, it means the movie is not in favourites yet
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            await addToFavourite(movie);
            // alert('Added to favourites');
            toast.success("Movie added to favourites!", { autoClose: 500 });
          } else {
            throw error; // Re-throw other errors
          }
        }
      }
      updateFavourites(); // Refresh the favourites state
    } catch (error) {
      console.error("Error updating favourites:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="movie-card">
      <Link to={`/${filter}/${id}`}>
        <Card.Img variant="top" src={posterurl} className="movie-card-img" />
      </Link>
      <Card.Body className="movie-card-body">
        <Card.Title className="movie-card-title">{title}</Card.Title>
        <Card.Text className="movie-card-text">
          <button
            onClick={handleFavouriteClick}
            className="btn btn-link btn-favourite"
            disabled={isUpdating}
          >
            {filter === "favourite" ? (
              <>
                Remove from Favourites&nbsp;
                <FontAwesomeIcon icon={faRectangleXmark} />
              </>
            ) : (
              <>
                Add to Favourites&nbsp;
                <FontAwesomeIcon icon={faHeart} className="text-red" />
              </>
            )}
          </button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MovieItem;
