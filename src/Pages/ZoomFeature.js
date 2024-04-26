import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';

const AlertGraph = () => {
  const [cy, setCy] = useState(null);

  const updateGraphStyles = (zoomLevel) => {
    cy.elements().forEach(ele => {
      if (ele.isNode()) {
        // Dynamic node styling based on zoom level
        ele.style({
          'background-color': zoomLevel > 1.5 ? 'red' : 'blue',
          'shape': zoomLevel > 2 ? 'rectangle' : 'ellipse',
          'width': zoomLevel > 2 ? 50 : 30,
          'height': zoomLevel > 2 ? 50 : 30
        });
      } else if (ele.isEdge()) {
        // Dynamic edge styling based on zoom level
        if (ele.data('multiple')) {
          ele.style('display', zoomLevel > 1.5 ? 'element' : 'none');
        }
        ele.style({
          'width': zoomLevel > 1.5 ? 6 : 3,
          'line-color': zoomLevel > 2 ? 'magenta' : 'grey',
          'label': zoomLevel > 2 ? `Weight: ${ele.data('weight')}` : ''
        });
      }
    });
  };

  useEffect(() => {
    if (cy) {
      updateGraphStyles(cy.zoom());
      cy.on('zoom', () => updateGraphStyles(cy.zoom()));
    }
  }, [cy]);

  return (
    <CytoscapeComponent
      elements={[
        { data: { id: 'node1', label: 'Node 1' }, position: { x: 100, y: 100 } },
        { data: { id: 'node2', label: 'Node 2' }, position: { x: 290, y: 190 } },
        { data: { id: 'node3', label: 'Node 3' }, position: { x: 300, y: 100 } },
        { data: { id: 'node4', label: 'Node 4' }, position: { x: 100, y: 300 } },
        { data: { id: 'node5', label: 'Node 5' }, position: { x: 300, y: 300 } },
        { data: { id: 'edge1', source: 'node1', target: 'node2', weight: 2, multiple: false } },
        { data: { id: 'edge2', source: 'node1', target: 'node3', weight: 3 } },
        { data: { id: 'edge3', source: 'node1', target: 'node4', weight: 4 } },
        { data: { id: 'edge4', source: 'node1', target: 'node5', weight: 5 } },
        // Additional edges between node1 and node2 that are normally hidden
        { data: { id: 'edge5', source: 'node1', target: 'node2', weight: 2, multiple: true } },
        { data: { id: 'edge6', source: 'node1', target: 'node2', weight: 2, multiple: true } },
        { data: { id: 'edge7', source: 'node1', target: 'node2', weight: 2, multiple: true } },
      ]}
      style={{ width: '100%', height: '500px' }}
      layout={{ name: 'preset' }}
      cy={(cyInstance) => setCy(cyInstance)}
    />
  );
};

export default AlertGraph;
