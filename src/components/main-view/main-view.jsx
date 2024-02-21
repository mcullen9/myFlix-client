import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: "65b354f0ed3a05235544d765",
      Title: "Inception",
      Description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      Genre: {
        Name: "Sci-Fi",
        Description:
          "Science fiction films incorporate futuristic elements such as advanced technology, space travel, and time travel.",
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Nolan is a renowned British-American filmmaker known for his visionary and groundbreaking work in the realm of cinema, particularly acclaimed for directing mind-bending narratives and visually striking films.",
        BirthYear: "1970",
        DeathYear: null,
      },
      ImagePath: "https://example.com/inception.jpg",
      Feature: true,
    },
    {
      _id: "65b355f3ed3a05235544d766",
      Title: "The Dark Knight",
      Description:
        "A gripping superhero film that follows Batman's quest to confront the anarchic Joker, exploring themes of chaos, morality, and the blurred line between heroism and vigilantism.",
      Genre: {
        Name: "Action",
        Description:
          "Action films emphasize physical activity and exhilaration.",
      },
      Director: {
        Name: "Christopher Nolan",
        Bio: "Christopher Nolan is a renowned British-American filmmaker known for his visionary and groundbreaking work in the realm of cinema, particularly acclaimed for directing mind-bending narratives and visually striking films.",
        BirthYear: "1970",
        DeathYear: null,
      },
      ImagePath: "https://example.com/dark_knight.jpg",
      Feature: true,
    },
    {
      _id: "65b358feed3a05235544d767",
      Title: "Avatar",
      Description:
        "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      Genre: {
        Name: "Sci-Fi",
        Description:
          "Science fiction films incorporate futuristic elements such as advanced technology, space travel, and time travel.",
      },
      Director: {
        Name: "James Cameron",
        Bio: "Legendary director",
        BirthYear: "1954",
        DeathYear: null,
      },
      ImagePath: "https://example.com/avatar.jpg",
      Feature: false,
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
