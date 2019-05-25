import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const MainContainerComponent = ({ children }) => {
  return (
    <Wrapper>
      <MainContainer>{children}</MainContainer>
    </Wrapper>
  );
};

export default MainContainer;
