import styled from "styled-components";

export const StyledBurger = styled.button`
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10

&:focus {
    outline: none;
  }

  div {
    z-index: 10;
    width: 2rem;
    height: 0.25rem;
    background: #effffa;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
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

.menu-link-container {
    display: flex;
    flex-direction: column;
    height: 80%;
    justify-content: space-evenly;
    align-items: center;
}

.dropdown-menu {
    display: flex;
    flex-direction: column;
}

.dropdown-burger-item {
    align-text: center;
}

@media (max-width: 768px) {
    width: 50%;
    }

@media (max-width: 500px) {
    width: 100%;
    }  
}
`;
