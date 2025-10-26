import React, { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieList from "../MovieList/MovieList";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { fetchMovies } from "../../services/movieService";
import styles from "./App.module.css";
import type { Movie } from "../../types/movie";

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching movies");
    }
  }, [isError]);

  useEffect(() => {
    if (
      !isLoading &&
      data &&
      data.results &&
      data.results.length === 0 &&
      query.trim()
    ) {
      toast("No movies found");
    }
  }, [data?.results?.length, isLoading, query]);

  const onSearch = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    const next = selected + 1;
    if (next !== page) setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬 Movie Search</h1>

      <SearchBar onSubmit={onSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Error fetching movies" />}

      {data && data.results && data.results.length > 0 && (
        <>
          <ReactPaginate
            breakLabel="..."
            nextLabel="→"
            previousLabel="←"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={Math.min(data.total_pages, 500)}
            forcePage={page - 1}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
          />
          <MovieList movies={data.results} onSelect={setSelectedMovie} />
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
