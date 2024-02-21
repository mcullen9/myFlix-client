export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <img src={book.image} />
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

/* Write the MovieView component to display more info about the movie- should render the movie's title, description, poster image, genre, director, etc. depending on what data you have store in your database.
Add a button to MovieView to navigate back to MainView's original state
*/
