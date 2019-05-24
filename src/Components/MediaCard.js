import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";

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

const Poster = styled.div`
  & img {
    height: 300px;
  }
`;

const MediaInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 10px;
`;
const Score = styled.div`
  width: 10%;
  text-align: center;
  display: flex;
  align-items: baseline;
  justify-content: center;
  font-size: 0.9em;
  font-weight: 700;
  color: #01d277;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: #2f2f2f;
  font-size: 0.9em;
  font-weight: 700;
  padding: 0 10px;
`;
const Date = styled.p`
  padding-top: 5px;
  color: #696969;
  font-size: 0.7em;
`;
const OverView = styled(LinesEllipsis)`
  line-height: 1.2em;
  font-size: 0.8em;
  overflow: hidden;
  padding: 0 10px;
  word-break: break-all;
`;
const MoreInfo = styled.p`
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  padding-left: 10px;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 0.7em;
  font-weight: 700;
  color: #696969;
  border-top: 1px solid #e0e0e0;
`;

const MediaCardComponent = ({
  id,
  title,
  original_title,
  vote_average,
  overview,
  poster_path,
  release_date,
  detail_link
}) => (
  <Container>
    <Poster>
      <Link to={detail_link}>
        <img src={poster_path} title={original_title} alt={original_title} />
      </Link>
    </Poster>
    <MediaInfo>
      <TitleContainer>
        <Score>{vote_average}</Score>
        <Title>
          <Link to={detail_link}>{title}</Link>
          <Date>{release_date}</Date>
        </Title>
      </TitleContainer>
      <OverView text={overview} maxLine="9" ellipsis="..." trimRight basedOn="letters" />
      <MoreInfo>
        <Link to={detail_link}>More Info</Link>
      </MoreInfo>
    </MediaInfo>
  </Container>
);

export default MediaCardComponent;
