import React from "react";

import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <label>Username:
      <input
        type="text"
        minLength={5}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      </label>
      <br />
      <label> Birthday: 
      <input
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
        required
      />
      </label>
      <br />
      <label> Email: 
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      </label>
      <br />
      <label>Password:
      <input
        type="password"
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </label>
      <br />
      <button type="submit"> Sign up </button>
    </form>
  );
}
