import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddBook from "../pages/Adm/AddBook/index";
import Home from "../pages/Adm/Home/index";
import LoanInformation from "../pages/Adm/LoanInformation";
import ChangeBook from "../pages/Adm/ChangeBook/index";
import DeliveryTime from "../pages/Adm/Loans/index";
import Profile from "../pages/Adm/Profile";

const AdmRoutes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path="loans" element={<DeliveryTime />}></Route>
      <Route path="loan/:id" element={<LoanInformation />}></Route>
      <Route path="book/:id" element={<ChangeBook />}></Route>
      <Route path="book/add" element={<AddBook />}></Route>
      <Route path="profile" element={<Profile />}></Route>

      <Route path="*" element={<Navigate to="/adm" replace />} />
    </Routes>
  );
};

export default AdmRoutes;
