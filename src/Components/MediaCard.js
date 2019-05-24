import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Poster = styled.div``;

const MediaInfo = styled.div``;

const TitleContainer = styled.div``;
const Score = styled.div``;
const Title = styled.div``;
const Date = styled.div``;
const OverView = styled.div``;
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
