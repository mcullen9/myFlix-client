import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  return (
    <div>
      <div>
        <img className="w-100" src={movie.ImagePath} />
      </div>
      <div>
        <h4>Title: {movie.Title}</h4>
      </div>
      <div>
        <p>{movie.Description}</p>
      </div>
      <div>
        <h5>Director: {movie.Director.Name}</h5>
      </div>
      <div>
        <h5>Genre: {movie.Genre.Name}</h5>
      </div>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      ImagePath: PropTypes.string,
      Title: PropTypes.string,
      Description: PropTypes.string,
      Director: PropTypes.shape({
        Name: PropTypes.string,
      }),
      Genre: PropTypes.shape({
        Name: PropTypes.string,
      }),
    })
  ),
};
