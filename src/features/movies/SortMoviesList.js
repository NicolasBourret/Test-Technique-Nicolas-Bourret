import { useSelector } from "react-redux";
import { selectAllMovies } from "./moviesSlice";

const filterCategories = (movies) => {
  const categoriesList = ["All"];

  movies.forEach((movie) => {
    if (!categoriesList.includes(movie.category)) {
      categoriesList.push(movie.category);
    }
  });

  return categoriesList;
};

export const SortMoviesList = ({ selectedCategory, setSelectedCategory }) => {
  const movies = useSelector(selectAllMovies);

  const categories = filterCategories(movies);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const options = categories.map((category, index) => (
    <option value={category} key={index}>
      {category}
    </option>
  ));

  return (
    <form className="sort">
      <label>Select a category</label>
      <select value={selectedCategory} onChange={handleChange}>
        {options}
      </select>
    </form>
  );
};
