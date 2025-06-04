import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import BulletinA from "./pages/BulletinA";
import BulletinB from "./pages/BulletinB";

function App() {
  return (
    <Router>
      <Navbar appName="Generador de Boletines" />
      <Routes>
        <Route exact path="/bulletin-generator" element={<BulletinA />} />
        <Route path="/b" element={<BulletinB />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
