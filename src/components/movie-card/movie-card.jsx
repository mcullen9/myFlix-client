import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          More Info
        </Button>
      </Card.Body>
    </Card>
  );
};

// define all the props constraints for the MovieCard here
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
