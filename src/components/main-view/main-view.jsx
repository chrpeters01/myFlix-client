import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    { 
      id: 1, 
      title: "The Departed",
      imageURL: "https://media.themoviedb.org/t/p/original/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
      genre: "Crime",
      director: "Martin Scorsese",
      description: "South Boston cop Billy Costigan goes under cover to infiltrate the organization of gangland chief Frank Costello.",

    },
    { 
      id: 2, 
      title: "Jurassic Park",
      imageURL: "https://media.themoviedb.org/t/p/original/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
      genre: "Action",
      director: "Steven Spielberg",
      description: "Paleontologists Alan Grant and Ellie Sattler and mathematician Ian Malcolm are among a select group chosen to tour an island theme park populated by dinosaurs created from prehistoric DNA.",
 
    },
    { 
      id: 3, 
      title: "Avatar",
      imageURL: "https://media.themoviedb.org/t/p/original/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
      genre: "Animated",
      director: "James Cameron",
      description: "On the lush alien world of Pandora live the Na'vi, beings who appear primitive but are highly evolved. Because the planet's environment is poisonous, human/Na'vi hybrids, called Avatars, must link to human minds to allow for free movement on Pandora.",
      

    }
  ]);

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
      {movies.map((movies) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newselectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
    );
  };
   
     