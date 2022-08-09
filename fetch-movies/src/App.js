import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: "Some Dummy Movie",
  //     openingText: "This is the opening text of the movie",
  //     releaseDate: "2022-05-18",
  //   },
  //   {
  //     id: 2,
  //     title: "Some Dummy Movie 2",
  //     openingText: "This is the second opening text of the movie",
  //     releaseDate: "2022-05-19",
  //   },
  // ];

  // function fetchMoviesHandler() {
  //   fetch("https://swapi.dev/api/films/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedMovies = data.results.map((e) => {
  //         return {
  //           id: e.episode_id,
  //           title: e.title,
  //           releaseDate: e.release_date,
  //           openingText: e.opening_crawl,
  //         };
  //       });

  //       setMovies(transformedMovies);
  //     });
  // }

  //using async await
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Sorry! Something went wrong!");
      } //since we throw error here, we wont execute below code
      //and will go to catch block

      const data = await response.json();

      const transformedMovies = data.results.map((e) => {
        return {
          id: e.episode_id,
          title: e.title,
          releaseDate: e.release_date,
          openingText: e.opening_crawl,
        };
      });

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  let content = <p>No Movies found in our database.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {isLoading && <p>Loading...</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && movies.length === 0 && !error && (
          <p>No Movies found in our database.</p>
        )} */}

        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
