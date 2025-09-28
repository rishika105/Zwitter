import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = useSelector(
    (state: { auth: { token: string | null } }) => state.auth.token
  );

  if (token !== null) return children;
  else return <Navigate to="/" />;
};

export default PrivateRoute;
