import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();
  
  const movie = movies.find((m) => m.id === movieId);
  
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
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};