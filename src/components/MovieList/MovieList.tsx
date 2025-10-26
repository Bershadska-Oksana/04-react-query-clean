import type { FC } from "react";
import styles from "./MovieList.module.css";
import type { Movie } from "../../types/movie";

interface MovieListProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieList: FC<MovieListProps> = ({ movies, onSelect }) => {
  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={styles.movieCard}
          onClick={() => onSelect(movie)}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className={styles.poster}
          />
          <h3 className={styles.title}>{movie.title}</h3>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
