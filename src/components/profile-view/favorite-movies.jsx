import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ token, user, favoriteMovies, updateUser }) => {
  return (
    <>
      <Row>
        <Col className="mb-5">
          <h4>Favorite Movies List</h4>
        </Col>
      </Row>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={6} className="mb-5">
            <Link to={`/movies/${encodeURIComponent(movie._id)}`} />
            <MovieCard
              key={movie._id}
              isFavorite={user.FavoriteMovies.includes(movie._id)}
              movie={movie}
              user={user}
              token={token}
              updateUser={updateUser}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};
