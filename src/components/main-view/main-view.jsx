import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const updateUser = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };
  console.log(token);

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

  // add to favorites button
  const handleAddToFavorites = (movieId) => {
    const newTitle = movies.find((movie) => movie._id === movieId);
    const user = JSON.parse(localStorage.getItem("user"));

    if (
      favoriteMovies &&
      favoriteMovies.some((movie) => movie._id === movieId)
    ) {
      console.log(`${movieId} is already in your favorites. `);
    } else if (newTitle) {
      setFavoriteMovies([...favoriteMovies, newTitle]);
      fetch(
        `https://myfaveflix.onrender.com/users/${user.Username}/movies/${movieId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add movie to Favorites.");
          }
          alert("Movie successfully added to Favorites!");
          return response.json();
        })
        .then((user) => {
          if (user) {
            updateUser(user);
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Error adding movie to favorites list.");
        });
    } else {
      alert("This movie is already in your favorites list.");
    }
  };

  // remove from favorites button
  const handleRemoveFromFavorites = (movieId) => {
    // const { FavoriteMovies } = updateUser;
    //const favoriteMovies = [...FavoriteMovies];
    //const updateUser = favoriteMovies.filter((_id) => _id !== movieId);

    // if (favoriteMovies && favoriteMovies.some((_id) => _id === movieId)) {
    //   setFavoriteMovies(updateUser);
    fetch(
      `https://myfaveflix.onrender.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from favorites.");
        }
        alert("Movie successfully removed from favorites.");
        return response.json();
      })
      .then((user) => {
        if (user) {
          updateUser(user);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("There was an error removing from favorites list.");
      });
  };

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
            path="/signup" // or /signup ?
            element={
              <>
                {user ? (
                  <Navigate to="/" />
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
            path="/profile" // or /users/:Username
            element={
              <Row className="justify-content-center">
                <Col sm={12} md={9} lg={7}>
                  {user ? (
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      onSubmit={(user) => setUser(user)}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )}
                </Col>
              </Row>
            }
          />
          <Route
            path="/movies/:movieId" // or MovieID?
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView user={user} token={token} movies={movies} />
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
                          movie={movie}
                          fav={user.FavoriteMovies.includes(movie._id)}
                          onAddToFavorites={(movieId) =>
                            handleAddToFavorites(movieId)
                          }
                          onRemoveFromFavorites={(movieId) =>
                            handleRemoveFromFavorites(movieId)
                          }
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
