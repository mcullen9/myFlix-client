import "./movie-card.scss";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({
  movie,
  fav,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const [isFavorite, setIsFavorite] = useState(fav);

  // Add to favorites
  const handleAddToFavorites = (event) => {
    event.preventDefault();
    onAddToFavorites(movie._id);
    setIsFavorite(true);
  };

  // Remove from favorites
  const handleRemoveFromFavorites = (event) => {
    event.preventDefault();
    onRemoveFromFavorites(movie._id);
    setIsFavorite(false);
  };

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      handleAddToFavorites(event);
    }
  };

  return (
    <>
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Button
              className="favorite-button"
              size="sm"
              variant={isFavorite ? "danger" : "outline-danger"}
              onClick={
                !isFavorite ? handleFavoriteClick : handleRemoveFromFavorites
              }
            >
              {isFavorite ? "Unfavorite" : "Favorite"}
            </Button>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};
