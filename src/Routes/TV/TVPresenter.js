import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MediaCard from "Components/MediaCard";
import { Routes } from "Components/Router";
import Loader from "Components/Loader";
import Pager from "Components/Pager";

const TVContainer = styled.div`
  display: grid;
  grid-gap: 50px 20px;
  grid-template-columns: repeat(auto-fill, 480px);
`;

const TVTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 1.1em;
  font-weight: 700;
`;

const tvTitleName = pathname => {
  console.log(pathname, Routes.tv.nowPlaying, "👿");
  if (pathname.includes(Routes.tv.nowPlaying)) {
    return "Airing Today Shows";
  } else if (pathname.includes(Routes.tv.popular)) {
    return "Popular TV Shows";
  } else if (pathname.includes(Routes.tv.topRated)) {
    return "Top Rated TV Shows";
  } else if (pathname.includes(Routes.tv.upcoming)) {
    return "On The Air Now!";
  } else {
    return "On The Air Now!";
  }
};

const TVPresenter = ({ loading = true, tvs, pathname, page = 1, totalPages }) => {
  tvs ? tvs.length > 0 && console.log("😉TVPresenter", tvs) : console.log("👿TVPresenter is null");
  return loading ? (
    <Loader />
  ) : (
    <>
      {console.log("tvTitleName:", pathname)}
      <TVTitle>{tvTitleName(pathname)}</TVTitle>
      <TVContainer>
        {tvs &&
          tvs.length > 0 &&
          tvs.map(tv => (
            <MediaCard
              id={tv.id}
              key={tv.id}
              title={tv.name}
              original_title={tv.original_name}
              vote_average={tv.vote_average}
              overview={tv.overview}
              poster_path={
                tv.poster_path &&
                tv.poster_path.length > 0 &&
                `https://image.tmdb.org/t/p/w200/${tv.poster_path}`
              }
              release_date={tv.first_air_date}
              detail_link={`${Routes.tv.home}/${tv.id}`}
            />
          ))}
      </TVContainer>
      <Pager uri={pathname} currentPage={page} totalPages={totalPages} />
    </>
  );
};

TVPresenter.propTypes = {
  loading: PropTypes.bool,
  tvs: PropTypes.array,
  pathname: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default TVPresenter;
