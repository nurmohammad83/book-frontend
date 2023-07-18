/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

export const PrivateRoute = ({ children }: any) => {
  const {accessToken} = useAppSelector((state) => state.auth);
  if (accessToken) {
    return children;
  }
  return <Navigate to="/login" />;
};