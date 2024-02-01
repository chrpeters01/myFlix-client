import { useState } from "react";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "The Departed" },
    { id: 2, title: "Jurassic Park" },
    { id: 3, title: "Avatar" }
  ]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
    <div>
      {movies.map((movie) => {
        return <div key={movie.id}>{movie.title}</div>;
      })}
    </div>
  );
}
};