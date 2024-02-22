import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img id='movie-image' src={movie.ImageURL} alt='' />
      </div>
      <div>
        <span>title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>director: </span>
        <span>{movie.Director.Name}</span>
      </div>
     <div>
        <span>description: </span>
        <span>{movie.Description}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};