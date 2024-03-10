import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import "./profile-view.scss";

export const ProfileView = ({ token, user, movies, onSubmit }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  const favoriteMovies = movies.filter((m) =>
    user.FavoriteMovies.includes(m.Title)
  );

  const handleSubmit = (event) => {
    event.preventDefault(event);

    const formData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: date,
    };

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
  };

  const handleUpdate = (e) => {
    switch (e.target.type) {
      case "text":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "date":
        setBirthday(e.target.value);
      default:
    }
  };

  const handleDeleteAccount = (_id) => {
    fetch(`https://myfaveflix.onrender.com/users/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        alert("The account has been successfully deleted.");
        localStorage.clear();
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
    });
  };

  return (
    <div>
      <p>User: {user.Username}</p>
      <p>Email: {user.Email}</p>
      <div>
        <h2>Favorite Movies</h2>
        {favoriteMovies.map((movies) => {
          return (
            <div key={movies._id}>
              <img src={movies.ImagePath} />
              <Link to={`/movies/${movies._id}`}>
                <h4>{movies.Title}</h4>
              </Link>
              <button variant="secondary" onClick={() => deleteFav(movies._id)}>
                Remove from list
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
