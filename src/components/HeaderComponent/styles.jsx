import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  width: 80%;
  height: 100px;
  display: flex;
  flex-direction: row;
  margin: auto;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  svg {
    font-size: 25px;
    :hover {
      cursor: pointer;
      scale: 1.2;
      transition-duration: 0.3s;
      transition-timing-function: ease-in-out;
    }
  }
  /* justify-content: center; */
`;
