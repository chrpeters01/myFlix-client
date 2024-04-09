import React from "react";
import "./profile-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

import { useState } from "react";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser }  from "./update-user";
import { Card, Button } from "react-bootstrap";

export const ProfileView = ({ token, user, movies, onSubmit }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(storedUser.UserName);
  const [email, setEmail] = useState(storedUser.Email);
  const [birthdate, setBirthdate] = useState(storedUser.Birthdate);
  const [password, setPassword] = useState("");

  const favoriteMovies = movies.filter(m => storedUser.FavoriteMovies.includes(m.title));

  const formData = {
    UserName: username,
    Email: email,
    Password: password
  };

  formData.Birthdate = birthdate ? new Date(birthdate).toISOString().substring(0, 10) : null;

  const handleSubmit = (event) => {
    event.preventDefault(event);
 
    // Send updated user information to the server, endpoint /users/:username
    fetch(`https://movies-flix-project-46e833a52919.herokuapp.com/users/${storedUser.UserName}`, {
      method: "PUT",
      body:JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}` }
      }
    )
    .then((response) => {
      if (response.ok) {
        alert("Update successful");
        return response.json()
      }
        alert("Update failed");
     })
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      onSubmit(data);
    })
    .catch((error) => {
        console.error(error);
      });
};

  const handleUpdate = (e) => {
    switch(e.target.type) {
      case "text":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "date":
        setBirthdate(e.target.value);
        default:
    }
}

const handleDeleteAccount = (id) => {
  fetch (`https://movies-flix-project-46e833a52919.herokuapp.com/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
    }
}).then ((response) => {
  if (response.ok) {
    alert("The account has been successfully deleted.");
    localStorage.clear();
    window.location.reload();
  } else {
    alert("Something went wrong.");
    }
  });
};

  return (
    <>
      <Row>
        <Card >
        <Card.Body>
        <Col 
        >
        </Col>
        <Row className="justify-content-center">
        <Card.Title><h2> Hello! {username} </h2></Card.Title>
        </Row>
        <Card.Text>
          {email}
        </Card.Text>
       </Card.Body>
        </Card>
        <Col>
          <UpdateUser 
           formData={formData}
           handleUpdate={handleUpdate}
           handleSubmit={handleSubmit}
           />
        </Col>
      </Row>
       <Row className="justify-content-center">
          <FavoriteMovies user={user} favoriteMovies={favoriteMovies} />
      </Row>
      <Button onClick={() => handleDeleteAccount(storedUser._id)} 
        className="button-delete mt-3" 
        type="submit" variant="outline-secondary">
        Delete account</Button>
    </>
  ); 
}
