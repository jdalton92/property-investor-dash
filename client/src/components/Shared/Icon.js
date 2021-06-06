import styled from "styled-components";

export const Icon = styled.div`
  height: ${({ size }) => (size ? `${size}` : `32px`)};
  min-width: ${({ size }) => (size ? `${size}` : `32px`)};
  -webkit-mask: ${({ url }) => `url(${url}) no-repeat center`};
  mask: ${({ url }) => `url(${url}) no-repeat center`};
  background-color: ${({ color }) => color};
  ${({ hover }) =>
    hover
      ? `&:hover {
    cursor: pointer;
    background-color: lightgrey;
  }`
      : null};
  ${({ active }) =>
    active
      ? `&:active {
    background-color: grey;
  }`
      : null};
`;

// import React, { useState } from "react";

// const Icon = ({ svg }) => {
//   const [icon, setIcon] = useState({});
//   console.log(svg);
//   console.log(typeof svg);

//   const createSvg = (svg) => {
//     const template = document.createElement("template");
//     template.innerHTML = svg;
//     const { attributes, innerHTML } = template.content.firstChild;
//     const attributesObj = [].slice.call(attributes).reduce(
//       (acc, n) => ({
//         ...acc,
//         [n.name]: n.value,
//       }),
//       {}
//     );
//     setIcon({
//       attributes: attributesObj,
//       innerHTML,
//     });
//   };
//   createSvg(svg);
//   return React.createElement("svg", {
//     ...icon.attributes,
//     dangerouslySetInnerHTML: {
//       __html: icon.innerHTML,
//     },
//   });
// };

// export default Icon;
