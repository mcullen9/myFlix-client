export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

/* Write a MovieCard component displaying the movie's title.
Write code that lets users go to the movie view when clicking a movie card.
*/
