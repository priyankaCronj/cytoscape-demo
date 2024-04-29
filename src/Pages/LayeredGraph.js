import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import { elements } from "../Data/data";

export default function LayeredGraph() {
  const cyStylesheet = sbgnStylesheet(cytoscape);

  const handleCyInit = (cy) => {
    cy.style(cyStylesheet);

    // Enable zooming
    cy.zoomingEnabled(true);

    // Set initial zoom level (optional)
    // cy.zoom(0.5); // Set the initial zoom level to 0.5 (50% zoom)

    cy.fit(cy.elements(), 50);
  };

  return (
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(elements)}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 50,
      }}
      cy={handleCyInit}
    />
  );
}
