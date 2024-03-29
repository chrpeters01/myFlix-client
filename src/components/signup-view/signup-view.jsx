import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(event)

    const data = {
      Username: username,
      Email: email,
      Birthdate: birthdate,
      Password: password
    };

  fetch("https://movies-flix-project-46e833a52919.herokuapp.com/users", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  }
}).then((response) => {
  if (response.ok) {
    alert("Signup successful");
    window.location.reload();
  }else{
    alert("Signup failed");
  }
});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1> Create an account </h1>
      <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
          type="text"
          minLength={5}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        required
        />
        </Form.Group>
        <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        required
        />
        </Form.Group>
        <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        </Form.Group>
        <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
        type="password"
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </Form.Group>
      <Button variant="primary" type="submit"> Sign up </Button>
    </Form>
  );
}