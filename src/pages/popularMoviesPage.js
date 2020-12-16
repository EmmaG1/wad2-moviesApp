import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage';
import {MoviesContext} from '../contexts/moviesContext';
import AddToFavoritesButton from '../components/buttons/addToFavorites';

const PopularMoviesPage = () => {
  const context = useContext(MoviesContext);
  const popularmovies = context.popularmovies.filter((p) => {
    return !("favorite" in p);
  });
  return (
      <PageTemplate 
        title='No. Popular Movies'
        movies={popularmovies}
        action={(movie) => {
          return <AddToFavoritesButton movie={movie} /> 
        }}
      />
  );
};

export default PopularMoviesPage;