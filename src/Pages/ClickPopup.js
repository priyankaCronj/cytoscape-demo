import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import COSEBilkent from "cytoscape-cose-bilkent";
import { Box, Modal, Typography } from "@mui/material";

cytoscape.use(cxtmenu); // Register the cxtmenu extension
cytoscape.use(COSEBilkent); // Register the cxtmenu extension

const MenuGraph = () => {
  const [modal, setModal] = useState(false);
  const cyContainerRef = useRef(null);
  const [selectedElement, setSelectedElement] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    if (cyContainerRef.current) {
      const cy = cytoscape({
        container: cyContainerRef.current,
        elements: [
            { data: { id: 'node1', label: 'Node 1' }, position: { x: 100, y: 100 } },
            { data: { id: 'node2', label: 'Node 2' }, position: { x: 290, y: 190 } },
            { data: { id: 'node3', label: 'Node 3' }, position: { x: 300, y: 100 } },
            { data: { id: 'node4', label: 'Node 4' }, position: { x: 100, y: 300 } },
            { data: { id: 'node5', label: 'Node 5' }, position: { x: 300, y: 300 } },
            { data: { id: 'edge1', source: 'node1', target: 'node2', weight: 2, multiple: false } },
            { data: { id: 'edge2', source: 'node1', target: 'node3', weight: 3 } },
            { data: { id: 'edge3', source: 'node1', target: 'node4', weight: 4 } },
            { data: { id: 'edge4', source: 'node1', target: 'node5', weight: 5 } },
        ],
        style: [
          {
            selector: "node",
            style: {
              "background-color": "#666",
              label: "data(id)",
              height: 50,
              width: 50,
            },
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#ccc",
              "target-arrow-color": "#ccc",
              "target-arrow-shape": "triangle",
            },
          },
        ],
        layout: {
          name: "grid",
          rows: 1,
        },
      });
      cy.on("click", "node", (event) => {
        const node = event.target;
        setSelectedElement({
          type: "node",
          id: node.id(),
          // Add any other relevant information you want to display
        });
        setModal(true);
      });

      cy.on("click", "edge", (event) => {
        const edge = event.target;
        setSelectedElement({
          type: "edge",
          id: edge.id(),
          source: edge.source().id(),
          target: edge.target().id(),
          // Add any other relevant information you want to display
        });
        setModal(true);
      });
      cy.cxtmenu({
        selector: "node",
        commands: [
          {
            content: '<span class="fa fa-trash"> delete</span>',
            select: (ele) => {
              alert("deleted the node");
            },
            fillColor: "red",
            contentStyle: {},
          },
          {
            content: '<span class="fa fa-repeat">reset</span>',
            select: (ele) => {
              alert("reset the node");
            },
            fillColor: "green",
          },
          {
            content: "Info",
            select: (ele) => {
              alert("Information the node");
              // setModal(!modal);
            },
            fillColor: "blue",
          },
          {
            content: "setting",
            select: (ele) => {
              alert("setting the node");
            },
            fillColor: "yellow",
          },
        ],
        fillColor: "rgba(0, 0, 0, 0.75)",
        activeFillColor: "rgba(1, 105, 217, 0.75)",
        activePadding: 10,
        indicatorSize: 24,
        separatorWidth: 3,
        spotlightPadding: 4,
        minSpotlightRadius: 24,
        maxSpotlightRadius: 38,
        openMenuEvents: "cxttapstart",
      });

      return () => {
        cy.destroy();
      };
    }
  }, []);

  const handleClose = () => {
    setModal(false);
    setSelectedElement(null);
  };
  console.log(modal);
  return (
    <>
      <div style={{ position: "relative" }}>
        <div ref={cyContainerRef} style={{ width: "700px", height: "100vh" }} />

        {modal && (
          <Modal
            open={modal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {selectedElement && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {selectedElement.type === "node" ? "Node" : "Edge"}{" "}
                    Information
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    ID: {selectedElement.id}
                    {selectedElement.type === "edge" && (
                      <>
                        <br />
                        Source: {selectedElement.source}
                        <br />
                        Target: {selectedElement.target}
                      </>
                    )}
                    {/* Add any other relevant information */}
                  </Typography>
                </>
              )}
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
};

export default MenuGraph;