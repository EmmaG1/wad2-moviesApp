import React, { useEffect, createContext, useReducer } from "react";
import { getMovies, getUpcomingMovies, getTopRated, getNowPlaying, getPopularMovies } from "../api/tmdb-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "add-favorite":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id ? { ...m, favorite: true } : m
        ),
       
        toprated: state.toprated.map((t) =>
         t.id === action.payload.movie.id ? { ...t, favorite: true } : t
        ),

        nowplaying: state.nowplaying.map((n) =>
          n.id === action.payload.movie.id ? { ...n, favorite: true } : n
        ),
      
        upcoming: [...state.upcoming],

        popularmovies: state.popularmovies.map((p) =>
          p.id === action.payload.movie.id ? { ...p, favorite: true } : p
        ),

      };
    case "add-watchlist":
      return {
        upcoming: state.upcoming.map((m) =>
          m.id === action.payload.movie.id ? { ...m, watchlist: true} : m
          ),
          
          toprated: [...state.toprated],
          nowplaying: [...state.nowplaying],
          popularmovies: [...state.popularmovies],
          movies: [...state.movies],
      };
    case "load": 
      return { movies: action.payload.movies, upcoming: [...state.upcoming], nowplaying: [...state.nowplaying], toprated: [...state.toprated],popularmovies: [...state.popularmovies] };
    case "load-upcoming": 
      return { upcoming: action.payload.movies, movies: [...state.movies],  nowplaying: [...state.nowplaying], toprated: [...state.toprated], popularmovies: [...state.popularmovies] };

    case "load-toprated":
      return{toprated: action.payload.movies, upcoming: [...state.upcoming], movies: [...state.movies], nowplaying: [...state.nowplaying], popularmovies: [...state.popularmovies] };

    case "load-nowplaying": //
      return{nowplaying: action.payload.movies, upcoming: [...state.upcoming], movies: [...state.movies], toprated: [...state.toprated], popularmovies: [...state.popularmovies] };

    case "load-popularmovies":
      return{popularmovies: action.payload.movies, upcoming: [...state.upcoming], movies: [...state.movies], toprated: [...state.toprated],  nowplaying: [...state.nowplaying]};

    case "add-review":
      return {
        movies: state.movies.map((m) =>
          m.id === action.payload.movie.id
            ? { ...m, review: action.payload.review }
            : m
        ),
        //
        upcoming: [...state.upcoming], nowplaying: [...state.nowplaying], toprated: [...state.toprated], popularmovies: [...state.popularmovies] 
      };
    default:
      return state;
  }
};

const MoviesContextProvider = (props) => { //
  const [state, dispatch] = useReducer(reducer, { movies: [], upcoming: [], nowplaying: [], toprated: [], popularmovies: []});

  const addToFavorites = (movieId) => { //
    const index = state.movies.map((m) => m.id).indexOf(movieId);
    dispatch({ type: "add-favorite", payload: { movie: state.movies[index], nowplaying: state.nowplaying[index], toprated: state.toprated[index],  popularmovies: state.popularmovies[index] } });
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

  useEffect(() => {
    getNowPlaying().then((movies) => {
      dispatch({ type: "load-nowplaying", payload: { movies } });
    });
  }, []);

  useEffect(() => {
    getPopularMovies().then((movies) => {
      dispatch({ type: "load-popularmovies", payload: { movies } });
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
        toprated: state.toprated,
        nowplaying: state.nowplaying,
        popularmovies: state.popularmovies,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;