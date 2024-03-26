import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container"


import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser }  from "./update-user";


export const ProfileView = ({ token, user, movies, onSubmit }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    const [username, setUsername] = useState(storedUser.username);
    const [email, setEmail] = useState(storedUser.email);
    const [birthdate, setBirthdate] = useState(storedUser.birthdate);
    const [password, setPassword] = useState("");

    const favoriteMovies = user === undefined ? [] : movies.filter(m => user.favoriteMovies.includes(m.title))

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

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movies-flix-project-46e833a52919.herokuapp.com/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Users data: ", data);
        const usersFromApi = data.map((resultUser) => {
        return {
          id: resultUser._id,
          username: resultUser.username,
          password: resultUser.password,
          email: resultUser.email,
          birthDate: resultUser.birthDate,
          favoriteMovies: resultUser.favoriteMovies
        };
      });
      setUser(usersFromApi.find((u) => u.username === localUser.username));
    //   localStorage.setItem('user', JSON.stringify(user));
      console.log("Profile Saved User: " + JSON.stringify(user));
    //   console.log("User Result Data: " + storedUser.username );
    //   storedUser = user;
    })
    .catch((error) => {
        console.error(error);
      });
}, [token]);



  return (
    <Container className="mx-1">
    <Row>
        <Card className="mb-5">
            <Card.Body>
                <Card.Title>My Profile  </Card.Title>
                    <Card.Text>
                        {
                            user && (<UserInfo name ={user.username} email={user.email} />)
                        }
                    </Card.Text>              
            </Card.Body>            
        </Card>
        <Card className="mb-5"> 
        <Card.Body>
          <UpdateUser 
           formData={formData}
           handleUpdate={handleUpdate}
           handleSubmit={handleSubmit}
           />
           </Card.Body>
           </Card>      
    </Row>
    <Button onClick={() => handleDeleteAccount(storedUser._id)} 
        className="button-delete mb-5" 
        type="submit" variant="outline-secondary"
        >
        Delete account
        </Button>
    <Row>
        <Col className="mb-5" xs={12} md={12}>
            {
                favoriteMovies && (<FavoriteMovies user={user} favoriteMovies={favoriteMovies} />)
            }
        </Col>
      </Row>
      </Container>
  )
}