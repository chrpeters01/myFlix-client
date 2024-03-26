import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export const MovieView = ({ movies }) => {
  const { movie_id } = useParams();
  
  const theMovie = movies.find((m) => m.id === movie_id);
  
  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{theMovie.Title}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{theMovie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{theMovie.Director.Name}</span>
      </div>
    
      <Link to={`/`}>
        <button className="back-button"> Back </button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    })
  }).isRequired,
};