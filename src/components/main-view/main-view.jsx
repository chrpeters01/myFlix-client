import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";



export const MainView = () => {
    const [books, setMovies] = useState([
      { id: 1, title: "Eloquent JavaScript" },
      { id: 2, title: "Mastering JavaScript Functional Programming" },
      { id: 3, title: "JavaScript: The Good Parts" },
      { id: 4, title: "JavaScript: The Definitive Guide" },
      { id: 5, title: "The Road to React" }
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