import React from "react";
import "./App.css";
import TaskCard from "./molecules/Card";
import Navbar from "./organisms/Navbar/Navbar";
import ModalDetail from "./organisms/ModalDetail";
import { ActionButton, TittleIcon } from "./atoms";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArticleIcon from "@mui/icons-material/Article";
import MemberList from "./molecules/MemberList";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
