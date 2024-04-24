import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";


export const FavoriteMovies = ({favoriteMovies}) => {
    return (
        <Row>
        <Col md={12}>
          <Card className="mt-2 mb-3">
            <Card.Body>
              <Card.Title>My Favorite Movies</Card.Title>
              {favoriteMovies.length
                ? favoriteMovies.map((favMovie) => <p>{favMovie.Title}</p>)
                : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
              }
