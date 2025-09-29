import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { GetToken } from "../lib/getToken";

export interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = GetToken();
  if (token !== null) return children;
  else return <Navigate to="/login" />;
};

export default PrivateRoute;
