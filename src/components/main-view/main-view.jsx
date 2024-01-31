import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export const MainView = () => {
    const [movies, setMovies] = useState([
      { id: 1, 
        title: "The Departed",
        image: "https://media.themoviedb.org/t/p/original/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
        director: "Martin Scorsese"
      },
      { id: 2, 
        title: "Jurassic Park",
        image: "https://media.themoviedb.org/t/p/original/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
        director: "Steven Spielberg"
      },
      { id: 3, 
        title: "Avatar",
        image: "https://media.themoviedb.org/t/p/original/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        director: "James Cameron"
      }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
  
    if (selectedMovie) {
      return <MovieView movie={selectedMovie} />;
    }

      if (movie.length === 0) {
        return <div>The list is empty!</div>;
    }
    
    return (
      <div>
        {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
    ))}
    </div>
    );
  };