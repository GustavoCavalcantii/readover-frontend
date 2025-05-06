import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthService } from '../utils/auth';

type UserRole = "admin" | "user" | null;

const getUserRole = (): UserRole => {
  const user = AuthService.getUser();
  const role = user?.role;
  return role === "admin" || role === "user" ? role : null;
};

const isAuthenticated = (): boolean => {
  return !!AuthService.getAccessToken();
};

const PrivateGeneralRoute: React.FC = () => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};


const AdminRoute: React.FC = () => {
  const location = useLocation();
  const role = getUserRole();

  if (!isAuthenticated() || role !== "admin") {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const UserRoute: React.FC = () => {
  const location = useLocation();
  const role = getUserRole();

  if (!isAuthenticated() || role !== "user") {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};


const TokenRequire: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  if (!query.get("token")) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};


const PublicRoute: React.FC = () => {
  const role = getUserRole();

  if (isAuthenticated()) {
    if (role === "admin") return <Navigate to="/adm" replace />;
    if (role === "user") return <Navigate to="/user" replace />;
  }

  return <Outlet />;
};

export { AdminRoute, UserRoute, PublicRoute, TokenRequire, PrivateGeneralRoute };
