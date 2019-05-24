import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-size: 0.9em;
  width: 480px;
  height: 300px;
  color: #696969;
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.5s linear;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }
`;

const Poster = styled.div``;

const MediaInfo = styled.div``;

const TitleContainer = styled.div`
  display: flex;
`;
const Score = styled.div`
  font-size: 0.9em;
  font-weight: 700;
`;
const Title = styled.div`
  color: #2f2f2f;
  font-size: 0.9em;
  font-weight: 700;
`;
const Date = styled.div`
  font-size: 0.8em;
`;
const OverView = styled.div`
  font-size: 0.8em;
`;
const MoreInfo = styled(Link)``;

const MediaCardComponent = ({
  id,
  original_title,
  vote_average,
  overview,
  poster_path,
  release_date,
  more_info_link
}) => (
  <Container>
    <Poster>
      <img src={poster_path} title={original_title} alt={original_title} />
    </Poster>
    <MediaInfo>
      <TitleContainer>
        <Score>{vote_average}</Score>
        <Title>{original_title}</Title>
        <Date>{release_date}</Date>
      </TitleContainer>
      <OverView>{overview}</OverView>
      <MoreInfo to={more_info_link}>More Info</MoreInfo>
    </MediaInfo>
  </Container>
);

export default MediaCardComponent;
