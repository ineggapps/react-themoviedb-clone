import React from "react";
import { css } from "@emotion/core";
// First way to import
import { HashLoader } from "react-spinners";
// Another way to import
// import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoaderComponent = () => (
  <div className="sweet-loading">
    <HashLoader css={override} sizeUnit={"px"} size={80} color={"#0652DD"} loading={true} />
  </div>
);

export default LoaderComponent;
