import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MediaCard from "Components/MediaCard";
import { Routes } from "Components/Router";
import Loader from "Components/Loader";

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

const MoviePresenter = ({ loading = true, movies, pathname }) => {
  movies
    ? movies.length > 0 && console.log("😉MoviePresenter", movies)
    : console.log("👿MoviePresenter is null");
  return loading ? (
    <Loader />
  ) : (
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
              title={movie.title}
              original_title={movie.original_title}
              vote_average={movie.vote_average}
              overview={movie.overview}
              poster_path={
                movie.poster_path &&
                movie.poster_path.length > 0 &&
                `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
              }
              release_date={movie.release_date}
              detail_link={`${Routes.movie.home}/${movie.id}`}
            />
          ))}
      </MovieContainer>
    </>
  );
};

MoviePresenter.propTypes = {
  loading: PropTypes.bool,
  movies: PropTypes.array,
  pathname: PropTypes.string.isRequired
};

export default MoviePresenter;
