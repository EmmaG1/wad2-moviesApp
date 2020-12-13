import React, { useEffect, createContext, useReducer } from "react";
//removed getCredits from below
import { getMovies, getUpcomingMovies, getTopRated } from "../api/tmdb-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: true } : m
        ),
        //copied from above
        toprated: state.toprated.map((t) =>
         t.id === action.payload.movie.id ? { ...t, favorite: true } : t
        ),
        //..........................
        upcoming: [...state.upcoming],
      };
    case "add-watchlist":
      return {
        upcoming: state.upcoming.map((m) =>
          m.id === action.payload.movie.id ? { ...m, watchlist: true} : m
          ),
          //added 11/12 dont think i need this
          toprated: [...state.toprated],
          //............................
          movies: [...state.movies],
      };
    case "load":
      return { movies: action.payload.movies, upcoming: [...state.upcoming], toprated: [...state.toprated] };
    case "load-upcoming":
      return { upcoming: action.payload.movies, movies: [...state.movies], toprated: [...state.toprated]};

    case "load-toprated":
      return{toprated: action.payload.movies, upcoming: [...state.upcoming], movies: [...state.movies]};

    case "add-review":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id
            ? { ...m, review: action.payload.review }
            : m
        ),
        //added toprated here 11/12
        upcoming: [...state.upcoming], toprated: [...state.toprated],
      };
    default:
      return state;
  }
};

const MoviesContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { movies: [], upcoming: [], toprated: [] });

  const addToFavorites = (movieId) => {
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-favorite", payload: { movie: state.movies[index], toprated: state.toprated[index] } });
  };

  const addToWatchList = (movieId) => {
    const index = state.upcoming.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-watchlist", payload: { movie: state.upcoming[index] } });
  };

  const addReview = (movie, review) => {
    dispatch({ type: "add-review", payload: { movie, review } });
  };

  useEffect(() => {
    getMovies().then((movies) => {
      dispatch({ type: "load", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      dispatch({ type: "load-upcoming", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //added 11/12
  useEffect(() => {
    getTopRated().then((movies) => {
      dispatch({ type: "load-toprated", payload: { movies } });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        upcoming: state.upcoming,
        addToFavorites: addToFavorites,
        addToWatchList: addToWatchList,
        addReview: addReview,
        //add toprated here?
        toprated: state.toprated,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;