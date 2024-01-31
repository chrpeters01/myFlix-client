import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";



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
  
    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    } else {
       return (
      <div>
        {movies.map((book) => {
          <MovieCard movie={movie} />
        })}
      </div>
      );
    }
  };