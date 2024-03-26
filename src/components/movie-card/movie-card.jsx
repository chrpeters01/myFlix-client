import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  
  const [addTitle, setAddTitle] = useState("");
  const [delTitle, setDelTitle] = useState("");
  
  
  //ADD MOVIES TO FAVORITE
useEffect(() => {
  const addToFavorites = () => {

  fetch (
    `https://cine-verse-b8832aa84c3e.herokuapp.com/users/${user.UserName}/movies/${encodeURIComponent(movie.title)}`,
    {
    method: 'POST',
    // body: JSON.stringify(favoriteMoviesData),
    headers: { "Authorization": `Bearer ${storedToken}`,
      'Content-Type': 'application/json'}
    },
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to add movie to favorites.");
    }
    alert("Movie added to favorites successfully!");
    window.location.reload();
    return response.json()
  })
  .then((user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user)
    }

  })
  .catch((error) => {
    console.error(error);
  });
};

const removeFromFavorites = () => {

  fetch (
    `https://cine-verse-b8832aa84c3e.herokuapp.com/users/${user.UserName}/movies/${encodeURIComponent(movie.title)}`,
    {
    method: 'DELETE',
    headers: { "Authorization": `Bearer ${storedToken}`,
      'Content-Type': 'application/json'}
    },
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to remove movie from favorites.");
    }
    alert("Movie removed from favorites successfully!");
    window.location.reload();
    return response.json()
  })
  .then((user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user)
    }

  })
  .catch((error) => {
    console.error(error);
  });
};

if (addTitle) {
  addToFavorites();
};
if (delTitle) {
  removeFromFavorites();
}
}, [addTitle, delTitle, token]);

const handleAddToFavorites = () => {
  setAddTitle(movie.title)
 }; 

 const handleRemoveFromFavorites = () => {
  setDelTitle(movie.title)
 }; 
  
  
  
  return (
    <>
   <Card>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
           <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  <Card>
{isFavorite ? ( 
  <Button variant="primary"  onClick={handleRemoveFromFavorites}>Remove from favorites</Button>
) : (
  <Button variant="primary" onClick={handleAddToFavorites}>Add to favorites</Button>  
)}
</Card>
</>
);
}



MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};
