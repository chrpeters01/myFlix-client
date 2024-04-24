import React from "react";
import { useParams } from "react-router";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const decodedMovieId = decodeURIComponent(movieId);
  const movie = movies.find((m) => m._id === decodedMovieId);

  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>

      <Link to={`/`}>
        <Button className="back-button"> Back </Button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
};
