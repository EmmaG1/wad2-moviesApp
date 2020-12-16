import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import HomePage from "./pages/homePage";
import MoviePage from './pages/movieDetailsPage'
import FavoriteMoviesPage from './pages/favoriteMoviesPage'
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MoviesContextProvider from "./contexts/moviesContext";
import GenresContextProvider from "./contexts/genresContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
//import movieCredits from "./components/movieCredits";
//added 6/12
//import CreditsPage from './pages/creditsPage';
import TopRatedMoviesPage from './pages/topRatedMoviesPage'; 
import NowPlayingMoviesPage from './pages/nowPlayingMoviesPage';

//  <Route exact path="/credits/:id" component={movieCredits}/>
// 

const App = () => {
  return (
    <BrowserRouter>
    <div className="jumbotron">
      <SiteHeader />      {/* New Header  */}
      <div className="container-fluid">
      <MoviesContextProvider> 
      <GenresContextProvider> 
        <ul className="navbar-nav text-black">
          <li className="nav-item">
            <Link className="nav-link " to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/movies/favorites">
              Favorites
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/movies/upcoming">  
              Upcoming Movies
            </Link>
          </li>
        </ul>
        <Switch>
          <Route exact path ="/movies/nowplaying" component={NowPlayingMoviesPage}/>
          <Route exact path="/reviews/form" component={AddMovieReviewPage} />
          <Route path="/reviews/:id" component={MovieReviewPage} />
          <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
          <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
          <Route exact path ="/movies/toprated" component={TopRatedMoviesPage}/>
         
          <Route exact path="/movies/:id" component={MoviePage} />
          <Route path="/" component={HomePage} />
          <Redirect from="*" to="/" />
        </Switch>
        </GenresContextProvider>
        </MoviesContextProvider>
      </div>
    </div>
  </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));