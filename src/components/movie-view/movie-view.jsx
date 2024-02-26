import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img id='movie-image' src={movie.imageURL} alt='' />
      </div>
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
     <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};