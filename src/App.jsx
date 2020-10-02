import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/organisms/Header/Header";
import MobileNavBar from "./components/organisms/MobileNavBar/MobilieNavBar";
import Routes from "./components/Routes";
import Footer from "./components/organisms/Footer/Footer";

import "./App.scss";

export default function App() {
  return (
    <Router>
      <Header />
      <MobileNavBar />
      <Routes />
      <Footer />
    </Router>
  );
}
