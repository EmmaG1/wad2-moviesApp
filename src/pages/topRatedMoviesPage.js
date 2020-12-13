  
import React, {useContext} from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
//import AddReviewButton from '../components/buttons/addReview';
import {MoviesContext} from '../contexts/moviesContext';


const TopRatedMoviesPage = props => {
  const context = useContext(MoviesContext);
  const toprated = context.toprated.filter( m => m.favorite )
  return (
    <MovieListPageTemplate
      movies={toprated}
      title={"No. of top rated movies"}
      //action={movie => <AddReviewButton movie={movie} />}
    />
  );
};

export default TopRatedMoviesPage;