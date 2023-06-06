import styled from "styled-components";

export const SignUpContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    background-color: #407b33;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    :hover {
      background-color: white;
      color: #407b33;
    }
  }
  img {
    margin-bottom: 5%;
  }
  .MuiFormControl-root {
    margin-bottom: 10px;

    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 5px;
    label {
      color: #022501;
      font-weight: 600;
    }
    input {
      color: #022501;
      background-color: #ffffff9a;
      border-radius: 3px;
    }
  }
  a {
    padding-top: 10px;
    color: #022501;
  }
`;
