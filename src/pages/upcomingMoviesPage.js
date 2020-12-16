import React, { useState, useEffect } from "react";
import StubAPI from "../api/stubAPI";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getUpcomingMovies().then(movies => { //finds the moviesd 
      setMovies(movies); //stores the movies
    });
  }, []);

  const addToFavorites = movieId => {
    setMovies(movies => {
      const index = movies.map(m => m.id).indexOf(movieId);
      StubAPI.add(movies[index]);
      let newMoviesState = [...movies]
      newMoviesState.splice(index, 1);
      return newMoviesState;
    });
  };

  return (
      <PageTemplate //used to build page
        title='Upcoming Movies'
        movies={movies} //passing the array list 
        buttonHandler={addToFavorites}
        action={(movies) => {
          // return <AddToFavoritesButton movie={toprated} /> 
        }}
      />
  );
};

export default MovieListPage;