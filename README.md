# MyFaveFlix Movie App

Welcome to MyFaveFlix, a web application that allows users to explore a collection of movies, manage their favorite movies, and update their user profile.

## Project Overview:

MyFaveFlix is a full-stack application built with React, Node.js, Express, and MongoDB. It provides features such as user authentication, profile management, and the ability to browse and interact with a catalog of movies.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **User Profile**: Users can view and update their profile information, including username, password, email, date of birth.
- **Favorite Movies**: Users can add and remove movies from their list of favorite movies.
- **Movie Catalog**: Users can explore a catalog of movies, search for movies by title, and view movie details, such as genre, director, and a brief summary.

## Technologies Used

- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB Atlas

## API Endpoints

**User Endpoints:**

GET /users: Get a list of all users (requires authentication)
GET /users/:Username: Get user information by username (requires authentication)
PUT /users/:Username: Update user information (requires authentication)
DELETE /users/:Username: Delete a user account (requires authentication)

**Movie Endpoints**

GET /movies: Get a list of all movies (requires authentication)
GET /movies/:Title: Get movie details by title (requires authentication)
GET /movies/genres/:genreName: Get movies by genre (requires authentication)
GET /movies/directors/:directorName: Get movies by director (requires authentication)

**Favorite Movies Endpoints**

POST /users/:Username/movies/:MovieID: Add a movie to a user's list of favorites (requires authentication)
DELETE /users/:Username/movies/:MovieID: Remove a movie from a user's list of favorites (requires authentication)

## Setup Instructions

### Installation:

1. Required Dependencies

`npm install -g parcel`

2.  Install React, React Dom, Bootstrap and React-Bootstrap
    `npm install`

### Run the application in the terminal

    `parcel src/index.html`

Open the Web Browser at http://localhost:1234

### Deployment and hosting on Netlify

- Install Parcel as a local developer dependency inside your project folder
  `npm install --save-dev parcel@2.11.0`
