import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Button from "react-bootstrap/Button";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams, //do I need this in main-view?
} from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]); // delete ?
  // const [selectedMovie, setSelectedMovie] = useState(null); //delete ?

  const updateUser = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myfaveflix.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
            ImagePath: movie.ImagePath,
          };
        });
        localStorage.setItem("movies", JSON.stringify(moviesFromApi));
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        movies={movies}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <br />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" /> //should this say /users like the api endpoint?
                ) : (
                  <Col md={4}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <Row className="justify-content-center">
                <Col sm={12} md={9} lg={7}>
                  {user ? (
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      onSubmit={(user) => setUser(user)}
                      // setFavoriteMovies(user.FavoriteMovies)
                      //newFav and deleteFav or addToFavorites and removeFromFavorites?
                    />
                  ) : (
                    <Navigate to="/login" />
                  )}
                </Col>
              </Row>
            }
          />
          <Route
            path="/movies/:MovieID" //might need to change Title to something else-- movieID?
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      //newFav and deleteFav? or addToFavorite and removeFromFavorites?
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard
                          key={movie._id}
                          isFavorite={user.FavoriteMovies.includes(movie.Title)} //Title or _id
                          movie={movie}
                          updateUser={updateUser}
                          user={user}
                          token={token}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
