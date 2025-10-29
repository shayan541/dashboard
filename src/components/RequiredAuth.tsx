import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { SettingContext } from "../store/SettingContext";


const RequiredAuth = () => {
  const context = useContext(SettingContext);
  if (!context) return <Navigate to="/" replace />;
  const { name } = context;

  if (!name) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default RequiredAuth;
