import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import {MoviesContext} from '../contexts/moviesContext'
import AddToFavoritesButton from '../components/buttons/addToFavorites'

const NowPlayingMoviesPage = () => {
  const context = useContext(MoviesContext);
  const nowplaying = context.nowplaying.filter((m) => {
    return !("favorite" in m);
  });
  return (
      <PageTemplate 
        title='No. Now Playing Movies'
        movies={nowplaying}
        action={(movie) => {
          return <AddToFavoritesButton movie={movie} /> 
        }}
      />
  );
};

export default NowPlayingMoviesPage;