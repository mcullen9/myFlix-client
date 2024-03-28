import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Form, Row, Col } from "react-bootstrap";
import { SearchBar } from "../search-bar/search-bar";
import { Routes, Route } from "react-router-dom";

export const NavigationBar = ({
  user,
  searchTerm,
  movies,
  handleSearch,
  onLoggedOut,
}) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFaveFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Movies
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>

          <Routes>
            <Route
              path="/"
              element={
                <Form inline="true">
                  <Row>
                    <Col xs="auto">
                      <SearchBar
                        handleSearch={handleSearch}
                        searchTerm={searchTerm}
                        movies={movies}
                      />
                    </Col>
                  </Row>
                </Form>
              }
            />
          </Routes>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.object,
  onLoggedOut: PropTypes.func.isRequired,
};
