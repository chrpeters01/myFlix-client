import React from "react";
import { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import "./profile-view.scss";
import moment from "moment";

export const ProfileView = ({ movies, token }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [username, setUsername] = useState(user.Username);
  //const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthdate] = useState(user.Birthdate);
  // const [showPassword, setShowPassword] = useState(false);

  const handleUpdate = (event) => {
    event.preventDefault(event);

    const data = {
      Username: username,
      Password: user.Password,
      // Password: password,
      Email: email,
      Birthdate: birthdate,
    };

    fetch(
      `https://movies-flix-project-46e833a52919.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Update failed");
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Update successful");
        }
      })
      .catch((error) => {
        console.error("Error during update:", error);
        alert("Update failed");
      });
  };

  const handleDeleteAccount = () => {
    fetch(
      `https://movies-flix-project-46e833a52919.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Account deleted successfully.");
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
    });
  };

  const favoriteMovies =
    storedUser && storedUser.FavoriteMovies
      ? movies.filter((m) => storedUser.FavoriteMovies.includes(m._id))
      : [];

  return (
    <>
      <Row>
        <Col md={12}>
          <Card className="mt-2 mb-3">
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              <p>Name: {user.Username}</p>
              <p>Email: {user.Email}</p>
              <p>
                Birthday: {moment(user.Birthdate).utc().format("MM/DD/YYYY")}{" "}
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12}>
          <Card className="mt-2 mb-3">
            <Card.Body>
              <Card.Title>Update User Profile</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                  />
                </Form.Group>

                {/*
                <Form.Group controlId="formPassword">
                <Form.Label>New Password:</Form.Label>
                 <Form.Control
                  type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                <Form.Check
                    type="checkbox"
                    label="Show Password"
                    onChange={() => setShowPassword(!showPassword)}/>
                </Form.Group>
                  */}

                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthdate.slice(0, 10)}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                  />
                  <br />
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </Button>{" "}
                  <Button variant="danger" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="mt-2 mb-3">
            <Card.Body>
              <Card.Title>My Favorite Movies</Card.Title>
              {favoriteMovies.length
                ? favoriteMovies.map((favMovie) => (
                    <p key={favMovie._id}>{favMovie.Title}</p>
                  ))
                : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

