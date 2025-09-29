import { Navigate } from "react-router-dom";
import type { PrivateRouteProps } from "./PrivateRoute";
import { GetToken } from "../lib/getToken";

function OpenRoute({ children }: PrivateRouteProps) {
  const token = GetToken();
  if (token !== null) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default OpenRoute;
