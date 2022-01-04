import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movies$ } from "../../database/movies";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await movies$;
  return response;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {
    deleteMovie(state, action) {
      state.movies.splice(action.payload, 1);
    },
    reactionAdded(state, action) {
      const { movieId, reaction } = action.payload;
      const existingMovie = state.movies.find((movie) => movie.id === movieId);
      if (existingMovie && reaction) {
        existingMovie[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = state.movies.concat(action.payload);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { deleteMovie, reactionAdded } = moviesSlice.actions;

export default moviesSlice.reducer;

export const selectAllMovies = (state) => state.movies.movies;
