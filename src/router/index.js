import * as React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import BoardDetails from "../pages/BoardDetails/BoardDetails";
import Login from "../pages/Login/Login";
import HomePage from "../pages/HomePage/HomePage";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route
            path="/board-detail/:boardId"
            element={<BoardDetails />}
          ></Route>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route></Route>
      </Routes>
    </>
  );
}

export default Router;
