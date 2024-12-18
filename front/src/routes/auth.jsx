import { useContext, useState } from "react";
import { PUT_login } from "../requests";
import { AuthContext } from "./root";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  /* Random number meaning:
   * authState = 0: Login
   * */
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const [authState, setAuthState] = useState(0);
  const [staff_username, setStaffUsername] = useState("");
  const [staff_pass, setStaffPass] = useState("");

  let login = function () {
    PUT_login(staff_username, staff_pass).then(() => {
      setAuthenticated(true);
      navigate("/profile");
    });
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            setAuthState(0);
          }}
        >
          Login
        </button>
      </div>
      {authState == 0 && (
        <div>
          <h3>Login</h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="first">Username:</label>
            <input
              type="text"
              id="staff_username"
              name="staff_username"
              placeholder="Enter your username"
              required
              value={staff_username}
              onChange={(e) => setStaffUsername(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="staff_pass"
              name="staff_pass"
              placeholder="Enter your Password"
              required
              value={staff_pass}
              onChange={(e) => setStaffPass(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" onClick={login}>
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}
