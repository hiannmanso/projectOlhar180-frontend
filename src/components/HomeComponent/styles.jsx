import styled from "styled-components";

export const HomeContainer = styled.div`
  height: 80vh;
  width: 80vw;
  display: flex;
  align-items: end;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  .list {
    background-color: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .image {
    width: 25px;
    :hover {
      cursor: pointer;
      /* scale: 1.2; */
    }
  }
  .addnew {
    width: 30px;
  }
  .addBtn {
    margin-bottom: 5px;
    border-radius: 5px;
    border: none;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    :hover {
      cursor: pointer;
      scale: 1.1;
    }
  }
  .taskbox {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .LocalizationProvider {
  }
  .btnSubmit {
    width: 100px;
    height: 60px;
  }
  .images {
    background-color: white;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  th {
    :hover {
      cursor: pointer;
      font-weight: 700;
    }

    text-align: center;
  }
  td {
    text-align: center;
  }
  input {
    width: 133px;
  }
`;
export const ButtonSubmit = styled.button`
  width: 150px;
  height: 40px;
  background-color: #001b00;
  color: white;
  border-radius: 5px;
  border: none;
  :hover {
    cursor: pointer;
    scale: 1.2;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }
`;
