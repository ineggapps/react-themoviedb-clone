import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainFullContainer = styled.div`
  position: relative;
  width: 100%;
`;

const MainFullContainerComponent = ({ children }) => {
  return (
    <Wrapper>
      <MainFullContainer>{children}</MainFullContainer>
    </Wrapper>
  );
};

export default MainFullContainerComponent;
