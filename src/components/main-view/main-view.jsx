import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "The Departed" },
    { id: 2, title: "Jurassic Park" },
    { id: 3, title: "Avatar" }
  ]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } 
    
    return (
    <div>
      {movies.map((movie) => (
        <MovieCard />
      ))}
      </div>
      );
      };