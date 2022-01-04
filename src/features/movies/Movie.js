import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteMovie, reactionAdded } from "./moviesSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export const Movie = ({ movie, index }) => {
  const [disabledLike, setDisabledLike] = useState(false);
  const [disabledDislike, setDisabledDislike] = useState(false);

  const dispatch = useDispatch();

  const onDeletePostClicked = (index) => {
    dispatch(deleteMovie(index));
  };

  return (
    <article key={movie.id} className="movie">
      <h2>{movie.title}</h2>
      <span className="category">{movie.category}</span>
      <div className="d-flex justify-between">
        <div>
          <button
            onClick={() => {
              setDisabledLike(true);
              setDisabledDislike(false);
              dispatch(
                reactionAdded({
                  movieId: movie.id,
                  reaction: "likes",
                })
              );
            }}
            disabled={disabledLike}
            className="btn btn--like"
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <progress
            value={(movie.likes * 100) / (movie.likes + movie.dislikes)}
            max={100}
          />
          <button
            onClick={() => {
              setDisabledDislike(true);
              setDisabledLike(false);
              dispatch(
                reactionAdded({
                  movieId: movie.id,
                  reaction: "dislikes",
                })
              );
            }}
            disabled={disabledDislike}
            className="btn btn--dislike"
          >
            <FontAwesomeIcon icon={faThumbsDown} />
          </button>
        </div>
        <div>
          <button
            onClick={() => onDeletePostClicked(index)}
            className="btn btn--delete"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </article>
  );
};
