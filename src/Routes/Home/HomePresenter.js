import React from "react";
import styled from "styled-components";
import MainFullContainer from "Components/MainFullContainer";

const About = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Shrikhand");
  position: relative;
  top: -20px;
  width: 100%;
  color: #fafafa;
  background-color: #0a1526;

  & > *:not(:last-child) {
    padding-top: 50px;
  }

  & > h2,
  h3 {
    text-align: center;
    font-family: Shrikhand;
  }

  & > h2 {
    font-size: 3.5em;
  }

  & > h3 {
    font-size: 1.5em;
  }
`;

const ContentWrapper = styled.div`
  padding-top: 50px;
  width: 1000px;
  margin: 0 auto;

  & > p {
    width: 800px;
    margin: 0 auto;
    text-align: center;
    letter-spacing: -0.01em;
    line-height: 1.2em;

    &:not(:last-child) {
      padding-bottom: 50px;
    }
  }

  & > h4 {
    text-align: center;
    font-family: Shrikhand;
    font-size: 1.3em;
  }
`;

const HomePresenter = () => (
  <MainFullContainer>
    <About>
      <h2>
        TheMovieDB
        <br />
        Clone Project
      </h2>
      <h3>Please Let you know this project.</h3>
      <ContentWrapper>
        <p>
          This Project is a created by my thinking. Because TheMovieDB site gives me a lot of things
          for learning about React Framework. Nowadays, AJAX is generalized in web sites. I
          understand that a new flatform, React, has been born on its extension.
        </p>
        <h4>Benefits of doing a project</h4>
        <div>
          <div>1</div>
          <p>sample text.</p>
        </div>
      </ContentWrapper>
    </About>
  </MainFullContainer>
);

export default HomePresenter;
