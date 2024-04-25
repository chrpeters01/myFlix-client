import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser ? storedUser : null);

  const addToFavorites = (movieId) => {
    fetch(
      `https://movies-flix-project-46e833a52919.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie to favorites.");
        }
        alert("Movie added to favorites successfully!");
        window.location.reload();
        return response.json();
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFromFavorites = (movieId) => {
    fetch(
      `https://movies-flix-project-46e833a52919.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from favorites.");
        }
        alert("Movie removed from favorites successfully!");
        window.location.reload();
        return response.json();
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Link
        className="link-card"
        to={`/movies/${encodeURIComponent(movie._id)}`}
      >
        <Card>
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Genre.Name}</Card.Text>
          </Card.Body>
        </Card>
      </Link>

      <Card>
        {isFavorite ? (
          <Button
            variant="primary"
            onClick={() => removeFromFavorites(movie._id)}
          >
            Remove from favorites
          </Button>
        ) : (
          <Button variant="primary" onClick={() => addToFavorites(movie._id)}>
            Add to favorites
          </Button>
        )}
      </Card>
    </>
  );
};
MovieCard.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};
