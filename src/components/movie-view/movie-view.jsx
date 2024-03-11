import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieID } = useParams();
  const movie = movies.find((m) => m._id === movieID);

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
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
  }).isRequired,
};
