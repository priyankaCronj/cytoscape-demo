import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import { elements } from "../Data/data";

export default function AnimationGraph() {
  const cyStylesheet = sbgnStylesheet(cytoscape);
  return (
    <CytoscapeComponent
      elements={CytoscapeComponent.normalizeElements(elements)}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
      }}
      cy={(cy) => cy.style(cyStylesheet)}
    />
  );
}
