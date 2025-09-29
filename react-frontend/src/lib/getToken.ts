import { useSelector } from "react-redux";

export function GetToken() {
   const token = useSelector(
    (state: { auth: { token: string | null } }) => state.auth.token
  );
  return token;
}
