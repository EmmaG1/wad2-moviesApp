  
import React, {useContext} from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
//import AddReviewButton from '../components/buttons/addReview';
import {MoviesContext} from '../contexts/moviesContext';


const TopRatedMoviesPage = () => {
  const context = useContext(MoviesContext);
  const toprated = context.toprated.filter((m) => {
    return !("favorites" in m);
  });

  return (
    <MovieListPageTemplate
      movies={toprated}
      title={"No. of top rated movies"}
      //action={movie => <AddReviewButton movie={movie} />}
      action={(toprated) => {
        // return <AddToFavoritesButton movie={toprated} /> 
      }}

    />
  );
};

export default TopRatedMoviesPage;