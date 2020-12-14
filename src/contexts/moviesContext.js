import React, { useEffect, createContext, useReducer } from "react";
//removed getCredits and getTopRated from below
import { getMovies, getUpcomingMovies, getNowPlaying } from "../api/tmdb-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: true } : m
        ),
        //copied from above
        // toprated: state.toprated.map((t) =>
        //  t.id === action.payload.movie.id ? { ...t, favorite: true } : t
        // ),

        nowplaying: state.nowplaying.map((n) =>
          n.id === action.payload.movie.id ? { ...n, favorite: true } : n
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
         // toprated: [...state.toprated],
          nowplaying: [...state.nowplaying],
          //............................
          movies: [...state.movies],
      };
    case "load": //, toprated: [...state.toprated]
      return { movies: action.payload.movies, upcoming: [...state.upcoming], nowplaying: [...state.nowplaying] };
    case "load-upcoming": //toprated: [...state.toprated],
      return { upcoming: action.payload.movies, movies: [...state.movies],  nowplaying: [...state.nowplaying]};

    // case "load-toprated":
    //   return{toprated: action.payload.movies, upcoming: [...state.upcoming], movies: [...state.movies], nowplaying: [...state.nowplaying]};

    case "load-nowplaying": //, toprated: [...state.toprated]
      return{nowplaying: action.payload.movies, upcoming: [...state.upcoming], movies: [...state.movies]};

    case "add-review":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id
            ? { ...m, review: action.payload.review }
            : m
        ),
        //, toprated: [...state.toprated]
        upcoming: [...state.upcoming], nowplaying: [...state.nowplaying]
      };
    default:
      return state;
  }
};

const MoviesContextProvider = (props) => { //, toprated: []
  const [state, dispatch] = useReducer(reducer, { movies: [], upcoming: [], nowplaying: [], });

  const addToFavorites = (movieId) => { //, toprated: state.toprated[index]
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-favorite", payload: { movie: state.movies[index], nowplaying: state.nowplaying[index] } });
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
  // useEffect(() => {
  //   getTopRated().then((movies) => {
  //     dispatch({ type: "load-toprated", payload: { movies } });
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    getNowPlaying().then((movies) => {
      dispatch({ type: "load-nowplaying", payload: { movies } });
    });
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
       // toprated: state.toprated,
        nowplaying: state.nowplaying,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;