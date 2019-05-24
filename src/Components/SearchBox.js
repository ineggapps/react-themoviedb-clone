import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 1000px;
  height: 50px;
  border: 0 none;
  margin: 0 auto;
  font-size: 0.9em;
  color: #666;
  &:focus {
    outline-width: 0;
  }
`;

const SearchBox = () => (
  <form>
    <Input type="text" placeholder="SearchBox" />
  </form>
);

export default SearchBox;
