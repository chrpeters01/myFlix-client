import React from 'react'
import Row  from 'react-bootstrap/Row'
import Col  from 'react-bootstrap/Col'
import { MovieCard } from '../movie-card/movie-card'
import { Link } from 'react-router-dom'

export const FavoriteMovies = ({user, favoriteMovies}) => {
  return (
   <Row>
    <Col md={12} >
        <h3>My Favorites</h3>
    </Col>
    <Row>
        {favoriteMovies.map((movie) => {
          return (
            <Col  className="mb-5" key={movie.id} md={4}>
              <Link to={`/movies/${movie.id}`} />
              <MovieCard
                movie={movie}
                isFavorite = {user.FavoriteMovies.includes(movie._id)}
              />
            </Col>
          );
        })}
      </Row>
   </Row>
   
  )
}