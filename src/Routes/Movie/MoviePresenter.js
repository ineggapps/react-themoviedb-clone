import React from "react";
import styled from "styled-components";
import MediaCard from "Components/MediaCard";
import { Routes } from "Components/Router";

const MovieContainer = styled.div`
  display: grid;
  grid-gap: 50px 20px;
  grid-template-columns: repeat(auto-fill, 480px);
`;

const MovieTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 1.1em;
  font-weight: 700;
`;

const movieTitleName = pathname => {
  console.log(pathname, Routes.movie.nowPlaying, "👿");
  if (pathname.includes(Routes.movie.nowPlaying)) {
    return "Now Playing Movies";
  } else if (pathname.includes(Routes.movie.popular)) {
    return "Popular Movies";
  } else if (pathname.includes(Routes.movie.topRated)) {
    return "Top Rated Movies";
  } else if (pathname.includes(Routes.movie.upcoming)) {
    return "UpComing Movies";
  } else {
    return "Now Playing Movies";
  }
};

const MoviePresenter = ({ loading, movies, pathname }) => {
  movies
    ? movies.length > 0 && console.log("😉MoviePresenter", movies)
    : console.log("👿MoviePresenter is null");
  return (
    <>
      {console.log("movieTitleName:", pathname)}
      <MovieTitle>{movieTitleName(pathname)}</MovieTitle>
      <MovieContainer>
        {movies &&
          movies.length > 0 &&
          movies.map(movie => (
            <MediaCard
              id={movie.id}
              key={movie.id}
              original_title={movie.original_title}
              vote_average={movie.vote_average}
              overview={movie.overview}
              poster_path={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              release_date={movie.release_date}
              more_info_link={`/movie/${movie.id}`}
            />
          ))}
      </MovieContainer>
    </>
  );
};

export default MoviePresenter;
