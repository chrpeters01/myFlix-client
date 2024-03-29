import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
