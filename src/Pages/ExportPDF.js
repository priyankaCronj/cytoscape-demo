import React, { useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import svg from "cytoscape-svg";
import { jsPDF } from "jspdf";
import { Canvg } from "canvg";

function ExportPDF() {
  const cyRef = useRef(null);

  cytoscape.use(svg);

  const setupElements = [
    { data: { id: "a", label: "Node A" }, position: { x: 150, y: 50 } },
    { data: { id: "b", label: "Node B" }, position: { x: 300, y: 150 } },
    { data: { id: "c", label: "Node C" }, position: { x: 150, y: 250 } },
    { data: { id: "d", label: "Node D" }, position: { x: 0, y: 150 } },
    { data: { id: "e", label: "Node E" }, position: { x: 450, y: 150 } },
    { data: { id: "ab", source: "a", target: "b", label: "action" } },
    { data: { id: "bc", source: "b", target: "c", label: "move" } },
    { data: { id: "cd", source: "c", target: "d", label: "go" } },
    { data: { id: "da", source: "d", target: "a", label: "return" } }, // Bidirectional with 'a'
    { data: { id: "be", source: "b", target: "e", label: "push" } },
    { data: { id: "ec", source: "e", target: "c", label: "pull" } },
  ];

  const exportSvg = () => {
    const cy = cyRef.current;
    const svgContent = cy.svg({ full: true });
    const blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

//   const exportPdf = async () => {
//     const cy = cyRef.current;
//     const svgContent = cy.svg({ full: true });

//     // Create a canvas to convert SVG to PNG
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     canvas.width = cy.width();
//     canvas.height = cy.height();

//     const v = Canvg.fromString(ctx, svgContent);
//     await v.render();

//     const image = canvas.toDataURL("image/png");

//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [cy.width(), cy.height()],
//     });
//     pdf.addImage(image, "PNG", 0, 0, cy.width(), cy.height());
//     pdf.save("graph.pdf");
//   };

const exportPdf = async () => {
    const cy = cyRef.current;
    const svgContent = cy.svg({ full: true });
  
    // Create a canvas to convert SVG to PNG
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = cy.width();
    canvas.height = cy.height();
  
    const v = Canvg.fromString(ctx, svgContent);
    await v.render();
  
    const image = canvas.toDataURL("image/png");
  
    // Convert dimensions and positions from pixels to points
    const widthPt = cy.width() * 0.75; // Convert width from pixels to points
    const heightPt = cy.height() * 0.75; // Convert height from pixels to points
    const scale = 0.75; // Adjust scale factor as needed
  
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [widthPt, heightPt],
    });
  
    // Add the image to the PDF with adjusted dimensions
    pdf.addImage(image, "PNG", 0, 0, widthPt, heightPt, "", "FAST");
  
    pdf.save("graph.pdf");
  };
  

  return (
    <div>
      <CytoscapeComponent
        cy={(cy) => {
          cyRef.current = cy;
        }}
        elements={setupElements}
        style={{ width: "800px", height: "600px" }}
        layout={{ name: "preset" }}
      />
      <button onClick={exportSvg}>Export as SVG</button>
      <button onClick={exportPdf}>Export as PDF</button>
    </div>
  );
}



export default ExportPDF