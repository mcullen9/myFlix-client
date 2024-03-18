import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ user, favoriteMovies }) => {
  return (
    <Col className="mb-5">
      <h3>Favorite Movies List</h3>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={6}>
            <Link to={`/movies/${movie._id}`} />
            <MovieCard
              key={movie._id}
              isFavorite={user.FavoriteMovies.includes(movie._id)} //Title or _id
              movie={movie}
            />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};
