import { useContext } from "react";
import { PUT_logout } from "../requests";
import { AuthContext } from "./root";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const logout = function () {
    PUT_logout().then(() => {
      setAuthenticated(false);
      navigate("/auth");
    });
  };
  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
}
