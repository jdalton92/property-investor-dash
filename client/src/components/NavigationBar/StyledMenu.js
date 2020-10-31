import styled from "styled-components";

export const StyledMenu = styled.nav`
  background: rgb(20, 27, 77);
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transition: transform 0.6s ease-in-out;
}
`;
