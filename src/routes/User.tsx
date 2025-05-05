import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/User/Home";
import Profile from "../pages/User/Profile";
import BookInformation from "../pages/User/BookInformation";
import UserLoan from "../pages/User/Loans";
import ResetEmail from "../pages/General/Auth/ResetEmail";
import LoanInformation from "../pages/Adm/LoanInformation";
import { TokenRequire } from "./PrivateRoutes";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path="profile" element={<Profile />}></Route>
      <Route path="book/:id" element={<BookInformation />}></Route>
      <Route path="loans" element={<UserLoan />}></Route>
      <Route path="loan/:id" element={<LoanInformation />}></Route>
      <Route element={<TokenRequire />}>
        <Route path="email/reset" element={<ResetEmail />}></Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;
