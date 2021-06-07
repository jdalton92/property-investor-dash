// import styled from "styled-components";

// export const Icon = styled.div`
//   height: ${({ size }) => (size ? `${size}` : `32px`)};
//   min-width: ${({ size }) => (size ? `${size}` : `32px`)};
//   -webkit-mask: ${({ url }) => `url(${url}) no-repeat center`};
//   mask: ${({ url }) => `url(${url}) no-repeat center`};
//   background-color: ${({ color }) => color};
//   ${({ hover }) =>
//     hover
//       ? `&:hover {
//     cursor: pointer;
//     background-color: lightgrey;
//   }`
//       : null};
//   ${({ active }) =>
//     active
//       ? `&:active {
//     background-color: grey;
//   }`
//       : null};
// `;

import React from "react";
import { ReactSVG } from "react-svg";

const Icon = ({ className, icon }) => {
  return <ReactSVG className={className} src={`./svg/${icon}.svg`} />;
};

export default Icon;
