import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const PaginationMoviesList = ({
  elementsPerPage,
  setElementsPerPage,
  page,
  setPage,
  moviesLength,
}) => {
  const handleChange = (event) => {
    setElementsPerPage(parseInt(event.target.value));
  };

  const prev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const next = () => {
    if (page < moviesLength - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className="d-flex justify-center pagination">
      <form>
        <label>Movies per page</label>
        <select
          value={elementsPerPage}
          onChange={handleChange}
          className="select--per-page"
        >
          <option value={4}>4</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
        </select>
      </form>
      {moviesLength > 1 && (
        <div>
          <button
            onClick={prev}
            disabled={page < 1}
            className="btn btn--pagination"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span>
            {page + 1}...{moviesLength}
          </span>
          <button
            onClick={next}
            disabled={page >= moviesLength - 1}
            className="btn btn--pagination"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </div>
  );
};
