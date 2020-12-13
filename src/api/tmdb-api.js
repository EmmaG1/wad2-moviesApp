export const getMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=1426f12d2f5a0a08718de4488213cec8&language=en-US&include_adult=false&page=1`
    )
      .then(res => res.json())
      .then(json => json.results);
  };
  
  export const getMovie = id => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1426f12d2f5a0a08718de4488213cec8`
    ).then(res => res.json());
  };
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=1426f12d2f5a0a08718de4488213cec8&language=en-US"
    )
      .then(res => res.json())
      .then(json => json.genres);
  };

  export const getMovieReviews = id => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=1426f12d2f5a0a08718de4488213cec8`
    )
      .then(res => res.json())
      .then(json => json.results);
  };

  export const getUpcomingMovies = id => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=1426f12d2f5a0a08718de4488213cec8&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(json => json.results); //returning the movies 
  };

  // export const getCredits = id => {
  //   return fetch(
  //     `https://api.themoviedb.org/3/movie/${id}/credits?api_key=1426f12d2f5a0a08718de4488213cec8&language=en-US&page=1&language=en-US`
  
  //   )
  //     .then(res => res.json())
  //     .then(json => json.cast);
  // };

  export const getTopRated = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=1426f12d2f5a0a08718de4488213cec8&language=en-US&page=1&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(json => json.results);
  };