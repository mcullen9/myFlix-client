import "./movie-card.scss";
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, isFavorite, updateUser }) => {
  const addToFavorites = () => {
    fetch(
      `https://myfaveflix.onrender.com/users/${
        user.Username
      }/movies/${encodeURIComponent(movie._id)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to Favorites.");
        }
        alert("Movie successfully added to Favorites!");
        return response.json();
      })
      .then((user) => {
        if (user) {
          updateUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFromFavorites = () => {
    fetch(
      `https://myfaveflix.onrender.com/users/${
        user.Username
      }/movies/${encodeURIComponent(movie._id)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from Favorites.");
        }
        alert("Movie successfully removed from Favorites.");
        return response.json();
      })
      .then((user) => {
        if (user) {
          updateUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddToFavorites = () => {
    addToFavorites();
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites();
  };

  return (
    <>
      <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
      <Card>
        {isFavorite ? (
          <Button variant="danger" onClick={handleRemoveFromFavorites}>
            Remove from Favorites
          </Button>
        ) : (
          <Button variant="primary" onClick={handleAddToFavorites}>
            Add to Favorites
          </Button>
        )}
      </Card>
    </>
  );
};

MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
