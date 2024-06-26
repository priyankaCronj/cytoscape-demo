import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayeredGraph from "./Pages/LayeredGraph";
import StyleSheetGraph from "./Pages/StyleSheetGraph";
import ExportPDF from "./Pages/ExportPDF";
import AlertGraph from "./Pages/ZoomFeature";
import MenuGraph from "./Pages/ClickPopup";
import CytoscapeGraph2 from "./Pages/StrokeLine";
import Navbar from "./Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LayeredGraph />} />
          <Route path="/sheet" element={<StyleSheetGraph />} />
          <Route path="/pdf" element={<ExportPDF />} />
          <Route path="/zoom" element={<AlertGraph />} />
          <Route path="/click" element={<MenuGraph />} />
          <Route path="/draw" element={<CytoscapeGraph2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
