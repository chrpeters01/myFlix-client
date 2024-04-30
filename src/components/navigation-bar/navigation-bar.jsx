import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState(""); // State to store the search input
  const location = useLocation(); // Get the current location/route

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value); // Update search input state
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput.trim()); // Set search query in parent component
  };

  // Render search bar only on the home page ("/")
  const renderSearchBar = location.pathname === "/";

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">MovieFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
        <Nav>
          {user ? (
            <>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              {renderSearchBar && (
                <Form onSubmit={handleSearchSubmit}>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    value={searchInput}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchSubmit(e);
                      }
                    }}
                  />
                </Form>
              )}
            </>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
