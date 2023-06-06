import logo from "../../assets/logomarca.png";
import * as s from "./styles";
import { ImExit } from "react-icons/im";
import { useNavigate } from "react-router-dom";
export default function HeaderComponent() {
  const navigate = useNavigate();
  return (
    <s.HeaderContainer>
      <img src={logo} alt="logo" />
      <ImExit
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/signin");
        }}
      />
    </s.HeaderContainer>
  );
}
