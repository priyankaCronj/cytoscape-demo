import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimationGraph from "./Pages/AnimationGraph";
import StyleSheetGraph from "./Pages/StyleSheetGraph";
import ExportPDF from "./Pages/ExportPDF";
import AlertGraph from "./Pages/ZoomFeature";
import MenuGraph from "./Pages/ClickPopup";
import CytoscapeGraph2 from "./Pages/StrokeLine";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimationGraph />} />
          <Route path="/sheet" element={<StyleSheetGraph />} />
          <Route path="/pdf" element={<ExportPDF />} />
          <Route path="/zoom" element={<AlertGraph />} />
          <Route path="/menu" element={<MenuGraph />} />
          <Route path="/draw" element={<CytoscapeGraph2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
