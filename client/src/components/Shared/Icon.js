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
