import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button, Card } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import "./profile-view.scss";

export const ProfileView = ({ token, user, movies, updateUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [profileImg, setProfileImg] = useState("");

  const favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

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
    fetch(`https://myfaveflix.onrender.com/users/${user.Username}`, {
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
        updateUser(data);
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
    fetch(`https://myfaveflix.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
              onClick={() => handleDeleteUser(user.Username)}
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
            user={user}
            favoriteMovies={favoriteMovies}
            movies={movies}
            token={token}
            updateUser={updateUser}
          />
        </Col>
      </Row>
    </>
  );
};
