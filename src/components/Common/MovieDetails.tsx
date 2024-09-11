import React, { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { LoadingStatus } from "../../models/types";
import IMovie from "../../models/IMovie";
import { Alert, Row, Col, Modal, ButtonGroup, Button } from "react-bootstrap";
import { getMovieById } from "../../services/movies";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

type Props = {};

const MovieDetails = (props: Props) => {
  const { filter, id } = useParams<{ filter: string; id: string }>();
  const [status, setStatus] = useState<LoadingStatus>("LOADING");
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const [showPoster, setShowPoster] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const getMovie = await getMovieById(filter!, id!);
        setMovie(getMovie);
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
    fetchMovie();
  }, [filter, id]);

  const handlePosterClick = () => {
    setShowPoster(true);
  };

  const handleClosePoster = () => {
    setShowPoster(false);
    setZoom(1);
    setRotation(0);
  };

  // Zoom In
  const zoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));

  // Zoom Out
  const zoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));

  // Rotate Clockwise
  const rotateClockwise = () =>
    setRotation((prevRotation) => prevRotation + 90);

  // Rotate Counter-Clockwise
  const rotateCounterClockwise = () =>
    setRotation((prevRotation) => prevRotation - 90);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let el;
  switch (status) {
    case "LOADING":
      el = (
        <LoadingIndicator
          size="large"
          message="We are fetching the details of the movie. Please wait..."
        />
      );
      break;
    case "LOADED":
      el = (
        <>
          <Row>
            <Col xs={12} lg={4} className="mt-4">
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginLeft: "60px",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={movie?.posterurl}
                  alt={movie?.title}
                  onClick={handlePosterClick}
                  style={{
                    cursor: "pointer",
                    objectFit: "cover",
                    width: "300px",
                    height: "450px",
                  }}
                />
                {isHovered && (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="hover-eye-icon"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      color: "black",
                      fontSize: "2rem",
                      opacity: 0.8,
                    }}
                  />
                )}
              </div>
            </Col>
            <Col xs={12} lg={8} className="mt-8">
              <h2>
                {movie?.title} ({movie?.year})
              </h2>
              <Row className="mt-4" style={{ marginTop: "50px" }}>
                <Col xs={12} md={6} style={{ width: "25%" }}>
                  <p>
                    <strong>IMDb Rating:</strong>
                  </p>
                  <p>
                    <strong>Content Rating:</strong>
                  </p>
                  <p>
                    <strong>Average Rating:</strong>
                  </p>
                  <p>
                    <strong>Duration:</strong>
                  </p>
                  <p>
                    <strong>Genres:</strong>
                  </p>
                  <p>
                    <strong>Actors:</strong>
                  </p>
                  <p>
                    <strong>Release Date:</strong>
                  </p>
                  <p>
                    <strong>Storyline:</strong>
                  </p>
                </Col>

                <Col xs={12} md={6}>
                  <p>{movie?.imdbRating || "N/A"}</p>
                  <p>{movie?.contentRating || "N/A"}</p>
                  <p>{movie?.averageRating || "N/A"}</p>
                  <p>{movie?.duration || "N/A"}</p>
                  <p>{movie?.genres?.join(", ") || "N/A"}</p>
                  <p>{movie?.actors?.join(", ") || "N/A"}</p>
                  <p>{movie?.releaseDate || "N/A"}</p>
                  <p>{movie?.storyline || "N/A"}</p>
                </Col>
              </Row>
            </Col>
          </Row>

          <Modal
            show={showPoster}
            onHide={handleClosePoster}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            fullscreen={true}
            // animation={true}
            centered={true}
            contentClassName="modal-content-center"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                <ButtonGroup className="image-controls">
                  <div onClick={zoomOut} className="control-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlassMinus} size="2x" />
                  </div>
                  <div onClick={zoomIn} className="control-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} size="2x" />
                  </div>
                  <div
                    onClick={rotateCounterClockwise}
                    className="control-icon"
                  >
                    <FontAwesomeIcon icon={faRotateLeft} size="2x" />
                  </div>
                  <div onClick={rotateClockwise} className="control-icon">
                    <FontAwesomeIcon icon={faRotateRight} size="2x" />
                  </div>
                </ButtonGroup>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: "transform 0.3s ease",
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  width: "100%"
                  // margin: "30%"

                }}
              >
                <img
                  src={movie?.posterurl}
                  alt={movie?.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                  }}
                />
              </div>
            </Modal.Body>
          </Modal>
        </>
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

export default MovieDetails;
