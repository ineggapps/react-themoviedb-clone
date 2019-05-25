import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
//https://www.npmjs.com/package/get-image-colors
import getColors from "get-image-colors";

const Backdrop = styled.div`
  display: block;
  position: absolute;
  left: 0;
  top: 150px;
  width: 100%;
  height: 500px;
  background: linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)),
    url(${props => props.path});
  background-size: cover;
  text-align: center;
  &:after {
    content: ".";
    visibility: hidden;
    text-indent: -1000em;
  }
  opacity: 0.8;
  z-index: -1;
`;

const Container = styled.div`
  width: 100%;
  height: 500px;
  z-index: 10;
`;

const MovieBox = styled.div``;
const MoviePoster = styled.div``;
const NoImage = styled.img``;

const MovieInfo = styled.div``;
const MovieTitle = styled.h2``;
const MovieTooltip = styled.p``;
const MovieOverview = styled.p;

const parseImage = async path => {
  let arrayColor = [];
  const result = await getColors(path).then(colors => arrayColor);
  return arrayColor;
};

const DetailPresenter = async ({ loading, pathname, detail }) => {
  console.log(detail);
  if (loading === false && detail !== undefined && detail) {
    let { backdrop_path: backdropPath } = detail;
    backdropPath = `https://image.tmdb.org/t/p/original/${backdropPath}`;
    const colors = parseImage(backdropPath);
    console.log(colors);
    return (
      <React.Fragment>
        <Backdrop path={backdropPath !== undefined && backdropPath.length > 0 && backdropPath} />
        <Container>
          <MovieBox>
            <MoviePoster>Poster</MoviePoster>
            <MovieInfo>Info</MovieInfo>
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
  detail: PropTypes.object
};

export default DetailPresenter;
