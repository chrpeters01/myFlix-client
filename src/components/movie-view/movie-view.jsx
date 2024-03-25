import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  
  const movie = movies.find((m) => m.id === movieId);
  
  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie}</span>
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
  }).isRequired
};
