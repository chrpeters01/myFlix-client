import { useState } from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch("https://movies-flix-project-46e833a52919.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie._id,
                    Title: movie.Title,
                    ImagePath: movie.imageURL,
                    Genre: {
                      Name: movie.Genre.Name
                    },
                    Director: {
                      Name: movie.Director.Name,
                     }
                   };
                });
            setMovies(moviesFromApi);
        });
}, []);
  
  const [selectedMovie, setSelectedMovie] = useState(null);






    
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
    
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } 
  
    return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
    );
  };
   
     