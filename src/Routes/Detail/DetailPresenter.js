import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Routes } from "Components/Router";
import MainFullContainer from "Components/MainFullContainer";

const Popup = styled.div`
  position: absolute;
  background-color: black;
  opacity: 0.3;
  width: 500px;
  height: 200px;
`;

const Backdrop = styled.div`
  display: block;
  position: absolute;
  left: 0;
  top: -20px;
  width: 156vmax;
  height: 500px;

  /* background:linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), */
  background: radial-gradient(
      circle at 20% 50%,
      rgba(
        ${props => props.colors[0]._rgb[0]},
        ${props => props.colors[0]._rgb[1]},
        ${props => props.colors[0]._rgb[2]},
        1
      ),
      rgba(
        ${props => props.colors[2]._rgb[0]},
        ${props => props.colors[2]._rgb[1]},
        ${props => props.colors[2]._rgb[2]},
        0.9
      )
    ),
    url(${props => props.path}) center center;
  background-size: cover;
  text-align: center;
  /* &:after {
    content: ".";
    visibility: hidden;
    text-indent: -1000em;
  } */
  opacity: 0.7;
  z-index: -1;
`;

const Container = styled.div`
  color: white;
  width: 1000px;
  height: 500px;
  margin: 0 auto;
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
  border-radius: 5px;
  width: 300px;
  height: 450px;
  background-color: #efefef;
`;

const MovieInfo = styled.div`
  width: 100%;
  margin-left: 20px;
  padding-top: 50px;
  & > *:not(:last-child) {
    margin-bottom: 10px;
  }
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

const onVideoPopupClick = (videoPopup, isVideoPopup, e) => {
  e.preventDefault();
  console.log("clicked!", e, videoPopup, isVideoPopup);
  videoPopup(!isVideoPopup);
};

const DetailPresenter = ({ loading, pathname, detail, colors, videoPopup, isVideoPopup }) => {
  console.log(detail);
  if (loading === false && detail !== undefined && detail) {
    let { backdrop_path: backdropPath } = detail;
    backdropPath = `${Routes.image.original}${backdropPath}`;
    if (colors !== undefined && colors.length > 0) {
      // bgColors = colors;
    }
    const { poster_path: posterPath } = detail;
    return (
      <MainFullContainer>
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
              {isVideoPopup ? (
                <div>test</div>
              ) : (
                <div>
                  <button onClick={e => onVideoPopupClick(videoPopup, isVideoPopup, e)}>
                    click me
                  </button>
                </div>
              )}
            </MovieInfo>
          </MovieBox>
        </Container>
      </MainFullContainer>
    );
  } else {
    return <div>loading</div>;
  }
};

DetailPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  pathname: PropTypes.string,
  detail: PropTypes.object,
  colors: PropTypes.array,
  videoPopup: PropTypes.func,
  isVideoPopup: PropTypes.bool
};

export default DetailPresenter;
