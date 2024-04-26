import React, { useState, useEffect, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import edgehandles from "cytoscape-edgehandles";

cytoscape.use(edgehandles); // register the edgehandles extension

function CytoscapeGraph2() {
  const cyRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [nodeCount, setNodeCount] = useState(0);

  const handleAddNode = (event) => {
    const nodeId = `n${nodeCount}`;
    const pos = event.position || { x: event.x, y: event.y };
    const newNode = {
      data: { id: nodeId },
      position: { x: pos.x, y: pos.y },
    };
    setElements((els) => [...els, newNode]);
    setNodeCount((count) => count + 1);
  };

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current;

      const eh = cy.edgehandles({
        toggleOffOnLeave: true,
        handleNodes: "node",
        handleSize: 10,
        edgeType: (sourceNode, targetNode) => "flat",
        preview: false, // Enables preview of the edge while it's being created
        edgeParams: () => ({
          classes: "edgehandles-preview, edgehandles-ghost-edge", // Adds classes for additional styling
        }),
        complete: (sourceNode, targetNode, addedEles) => {
          console.log(
            `Edge added between ${sourceNode.id()} and ${targetNode.id()}`
          );
          eh.stop(); // Stop the edge drawing process
        },
      });

      // Enable edge creation on node tap
      cy.on("tap", "node", (event) => {
        eh.start(event.target);
      });

      // Add node on background tap
      cy.on("tap", (event) => {
        if (event.target === cy) {
          handleAddNode(event);
        }
      });

      return () => {
        cy.removeListener("tap");
        eh.destroy();
      };
    }
  }, [elements]);

  return (
    <div
      style={{
        border: "3px solid #ccc",
        width: "90%",
        height: "800px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin:"auto"
      }}
    >
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "100%" }}
        stylesheet={[
          {
            selector: "node",
            style: {
              "background-color": "#666",
              label: "data(id)",
            },
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#ccc",
              "target-arrow-color": "#ccc",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
          {
            selector: ".edgehandles-ghost-edge",
            style: {
              "line-color": "transparent",
              "target-arrow-color": "transparent",
              "curve-style": "bezier",
            },
          },
        ]}
        layout={{
          name: "preset",
        }}
        cy={(cy) => {
          cyRef.current = cy;
        }}
      />
    </div>
  );
}

export default CytoscapeGraph2;
