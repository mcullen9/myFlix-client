import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
//import { Link } from "react-router-dom";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import "./profile-view.scss";

export const ProfileView = ({ user, token, movies }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [profileImg, setProfileImg] = useState("");

  const formData = {
    Username: username,
    Password: password,
    Email: email,
  };

  formData.Birthday = birthday
    ? new Date(birthday).toISOString().substring(0, 10)
    : null;

  function handleSubmit(event) {
    event.preventDefault(event);
    // Updated info goes to `/users/:Username` endpoint
    fetch(`https://myfaveflix.onrender.com/users/${storedUser.Username}`, {
      //find out syntax for the storedUser endpoint in the URL
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Update successful");
          return response.json();
        } else {
          alert("Update failed");
        }
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        onSubmit(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleUpdate = (e) => {
    switch (e.target.type) {
      case "text":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "date":
        setBirthday(e.target.value);
      default:
    }
  };

  const handleDeleteUser = () => {
    fetch(`https://myfaveflix.onrender.com/users/${storedUser.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, //storedToken??
      },
    }).then((response) => {
      if (response.ok) {
        alert("User has been successfully deleted.");
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
        <Card>
          <Row>
            <Col />
            <Col>
              <img
                src={profileImg}
                width="80"
                height="80"
                className="profile-img"
              />
            </Col>
            <Col />
          </Row>
          <Card.Body>
            <Card.Title>
              <h2> Hello {username}! </h2>
            </Card.Title>
            <Card.Text>{email}</Card.Text>
            <br />
            <Button
              onClick={() => handleDeleteUser(storedUser.Username)}
              className="button-delete"
              type="submit"
              variant="outline-secondary"
            >
              Delete User
            </Button>
          </Card.Body>
        </Card>
        <Col>
          <UpdateUser
            formData={formData}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />
        </Col>
        <br />
      </Row>
      <hr />
      <Row className="justify-content-center">
        <Col>
          <FavoriteMovies
            movies={movies}
            favoriteMovies={favoriteMovies}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFromFavorites={handleRemoveFromFavorites}
          />
        </Col>
      </Row>
    </>
  );
};
