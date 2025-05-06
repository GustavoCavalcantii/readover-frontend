import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminRoute, PrivateGeneralRoute, PublicRoute, TokenRequire, UserRoute } from "./PrivateRoutes";
import AuthContainer from "../pages/General/Auth/Login";
import ResetPass from "../pages/General/Auth/ResetPass";
import RequestPass from "../pages/General/Auth/RequestPass";
import Showcase from "../pages/Showcase";
import UserRoutes from "./User";
import AdmRoutes from "./Adm";
import ResetEmail from "../pages/General/Auth/ResetEmail";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/user/*" element={<UserRoute />}>
        <Route path="*" element={<UserRoutes />} />
      </Route>

      <Route path="/adm/*" element={<AdminRoute />}>
        <Route path="*" element={<AdmRoutes />} />
      </Route>

      <Route path="/" element={<Showcase />} />
      <Route path="/auth/request-pass" element={<RequestPass />} />

      <Route element={<TokenRequire />}>
        <Route path="/auth/reset-pass" element={<ResetPass />} />
      </Route>

      <Route element={<PrivateGeneralRoute />}>
        <Route element={<TokenRequire />}>
          <Route path="/auth/email/reset" element={<ResetEmail />}></Route>
        </Route>
      </Route>

      <Route path="/" element={<PublicRoute />}>
        <Route path="auth" element={<AuthContainer />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;
