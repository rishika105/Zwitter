import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { PrivateRouteProps } from "./PrivateRoute";

function OpenRoute({ children }: PrivateRouteProps) {
  const token = useSelector(
    (state: { auth: { token: string | null } }) => state.auth.token
  );

  if (token !== null) {
    return <Navigate to="/my-todos" replace />;
  }

  return children;
}

export default OpenRoute;
