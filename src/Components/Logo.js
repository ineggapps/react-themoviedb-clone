import React from "react";
import styled from "styled-components";

const Logo = styled.div`
  color: #01d277;
  border: 5px solid #01d277;
  border-radius: 5px;
  width: 75px;
  height: 75px;
  padding: 8px;
  font-size: 0.8em;
  font-weight: 700;
  user-select: none;
`;

export default () => (
  <Logo>
    The
    <br />
    Movie
    <br />
    DB
  </Logo>
);
