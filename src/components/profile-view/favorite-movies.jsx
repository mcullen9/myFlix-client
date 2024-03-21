import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({
  favoriteMovies,
  onAddToFavorites,
  onRemoveFromFavorites,
  onFavoriteClick,
  fav,
}) => {
  const [isFavorite, setIsFavorite] = useState(fav);

  const handleAddToFavorites = (event) => {
    event.preventDefault();
    onAddToFavorites(movie.id);
    setIsFavorite(true);
  };

  // Remove from favorites

  const handleRemoveFromFavorites = (event) => {
    event.preventDefault();
    onRemoveFromFavorites(movie.id);
    setIsFavorite(false);
  };

  // Setting favorite

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      handleAddToFavorites(event);
    }
  };

  return (
    <Col className="mb-5">
      <h3>Favorite Movies List</h3>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={6}>
            <Link to={`/movies/${movie._id}`} />
            <MovieCard
              key={movie._id}
              movie={movie}
              fav={favoriteMovies.includes(movie._id)}
              onAddToFavorites={onAddToFavorites}
              onRemoveFromFavorites={onRemoveFromFavorites}
              onFavoriteClick={onFavoriteClick}
            />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
};
