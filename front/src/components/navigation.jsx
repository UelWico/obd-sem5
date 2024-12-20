import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../routes/root";

export default function Navigation() {
  const { authenticated } = useContext(AuthContext);
  return (
    <div className="navigation-container">
      <nav className="links-container">
        {!authenticated ? (
          <Link className="link-button" to={`auth`}>
            L
          </Link>
        ) : (
          <>
            <Link className="link-button" to={`orders`}>
              R
            </Link>
            <Link className="link-button" to={`profile`}>
              P
            </Link>
            <Link className="link-button" to={`job`}>
              J
            </Link>
            <Link className="link-button" to={`staff`}>
              St
            </Link>
            <Link className="link-button" to={`absence_type`}>
              AT
            </Link>
            <Link className="link-button" to={`delivery_type`}>
              DT
            </Link>
            <Link className="link-button" to={`table`}>
              T
            </Link>
            <Link className="link-button" to={`supplier`}>
              Sup
            </Link>
            <Link className="link-button" to={`client`}>
              C
            </Link>
            <Link className="link-button" to={`concert`}>
              Con
            </Link>
            <Link className="link-button" to={`delivery`}>
              D
            </Link>
            <Link className="link-button" to={`payout`}>
              Pay
            </Link>
            <Link className="link-button" to={`timesheet`}>
              TS
            </Link>
            <Link className="link-button" to={`reservation`}>
              Res
            </Link>
          </>
        )}
      </nav>
      <p>WAD Project</p>
    </div>
  );
}
