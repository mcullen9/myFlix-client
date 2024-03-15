import "./movie-card.scss";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token, isFavorite, updateUser }) => {
  const [newFav, setNewFav] = useState("");
  const [deleteFav, setDeleteFav] = useState("");

  // Add movie to FavoriteMovies list
  useEffect(() => {
    const addToFavorites = () => {
      fetch(
        `https://myfaveflix.onrender.com/users/${
          user.Username
        }/movies/${encodeURIComponent(movie._id)}`, //or MovieID
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //should it say storedToken- if yes, also call storedToken in params
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
            updateUser(user); //check where else this is used
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const removeFromFavorites = () => {
      //empty () if it doesn't work or change to MovieID
      fetch(
        `https://myfaveflix.onrender.com/users/${
          user.Username
        }/movies/${encodeURIComponent(movie._id)}`, //_id or Title
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, //this also might need to be storedToken
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

    if (newFav) {
      addToFavorites();
    }
    if (deleteFav) {
      removeFromFavorites();
    }
  }, [newFav, deleteFav, token]);

  const handleAddToFavorites = () => {
    setNewFav(movie.Title);
  };

  const handleRemoveFromFavorites = () => {
    setDeleteFav(movie.Title);
  };

  return (
    <>
      <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
      <Card>
        {isFavorite ? (
          <Button variant="primary" onClick={handleRemoveFromFavorites}>
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
