import * as React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import BoardDetails from "../pages/BoardDetails/BoardDetails";
import Login from "../pages/Login/Login";
import HomePage from "../pages/HomePage/HomePage";
import RegisterPage from "../pages/Register/RegisterPage";
import AuthRequire from "./AuthRequire";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />}></Route>
        <Route path="/board-detail/:boardId" element={<BoardDetails />}></Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
