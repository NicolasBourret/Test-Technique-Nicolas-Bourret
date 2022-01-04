import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Movie } from "./Movie";
import { PaginationMoviesList } from "./PaginationMoviesList";
import { SortMoviesList } from "./SortMoviesList";
import { selectAllMovies, fetchMovies } from "./moviesSlice";

export const MoviesList = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [elementsPerPage, setElementsPerPage] = useState(4);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();

  const movies = useSelector(selectAllMovies);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  let moviesPerPage = [];
  let moviesByCategory = [];
  let content;

  useEffect(() => {
    if (movieStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [movieStatus, dispatch]);

  movies.forEach((movie) => {
    if (selectedCategory !== "All" && movie.category !== selectedCategory) {
      return;
    }
    moviesByCategory.push(movie);
  });

  for (let i = 0; i <= movies.length; i = i + elementsPerPage) {
    moviesPerPage.push(moviesByCategory.slice(i, elementsPerPage + i));
    moviesPerPage = moviesPerPage.filter((movie) => movie.length > 0);
  }

  if (movieStatus === "loading") {
    content = <div>Chargement...</div>;
  } else if (movieStatus === "succeeded") {
    content = moviesPerPage[page].map((movie, index) => {
      if (movie !== null) {
        return <Movie movie={movie} index={index} key={movie.id} />;
      }
      return null;
    });
  } else if (movieStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <section className="filterable-list">
      <SortMoviesList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="d-flex flex-wrap">{content}</div>
      <PaginationMoviesList
        elementsPerPage={elementsPerPage}
        setElementsPerPage={setElementsPerPage}
        page={page}
        setPage={setPage}
        moviesLength={moviesPerPage.length}
      />
    </section>
  );
};
