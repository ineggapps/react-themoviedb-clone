import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Routes } from "Components/Router";

const Backdrop = styled.div`
  display: block;
  position: absolute;
  left: 0;
  top: 150px;
  width: 100%;
  height: 500px;

  /* background:linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), */
  background: linear-gradient(
      to bottom,
      rgba(
        ${props => props.colors[0]._rgb[0]},
        ${props => props.colors[0]._rgb[1]},
        ${props => props.colors[0]._rgb[2]},
        1
      ),
      rgba(
        ${props => props.colors[1]._rgb[0]},
        ${props => props.colors[1]._rgb[1]},
        ${props => props.colors[1]._rgb[2]},
        0.9
      )
    ),
    url(${props => props.path});
  background-size: cover;
  text-align: center;
  &:after {
    content: ".";
    visibility: hidden;
    text-indent: -1000em;
  }
  opacity: 0.7;
  z-index: -1;
`;

const Container = styled.div`
  width: 100%;
  height: 500px;
  z-index: 10;
`;

const MovieBox = styled.div`
  display: flex;
`;
const MoviePoster = styled.div``;
const Poster = styled.img`
  border-radius: 5px;
`;
const NoImage = styled.div`
  width: 300px;
  height: 450px;
  background-color: #efefef;
`;

const MovieInfo = styled.div`
  margin-left: 50px;
`;
const MovieTitle = styled.h2`
  color: white;
  letter-spacing: -0.05em;
  font-size: 1.4em;
  font-family: "Days One", sans-serif;
`;
const MovieTooltip = styled.p``;
const MovieOverview = styled.p``;

const rgbToHex = rgb => {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

const DetailPresenter = ({ loading, pathname, detail, colors }) => {
  console.log(detail);
  if (loading === false && detail !== undefined && detail) {
    let { backdrop_path: backdropPath } = detail;
    backdropPath = `${Routes.image.original}${backdropPath}`;
    if (colors !== undefined && colors.length > 0) {
      // bgColors = colors;
    }
    const { poster_path: posterPath } = detail;
    return (
      <React.Fragment>
        <Backdrop
          path={backdropPath !== undefined && backdropPath.length > 0 && backdropPath}
          colors={colors}
        />
        <Container>
          <MovieBox>
            <MoviePoster>
              {posterPath !== undefined && posterPath && posterPath.length > 0 ? (
                <Poster src={`${Routes.image.w300}${posterPath}`} alt={detail.title} />
              ) : (
                <NoImage />
              )}
            </MoviePoster>
            <MovieInfo>
              <MovieTitle>{detail.title ? detail.title : detail.name}</MovieTitle>
              <MovieTooltip>{detail.vote_average}</MovieTooltip>
              <MovieOverview>{detail.overview}</MovieOverview>
            </MovieInfo>
          </MovieBox>
        </Container>
      </React.Fragment>
    );
  } else {
    return <div>loading</div>;
  }
};

DetailPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  pathname: PropTypes.string,
  detail: PropTypes.object,
  colors: PropTypes.array
};

export default DetailPresenter;
