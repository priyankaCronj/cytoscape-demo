npm i cytoscape
npm i react-cytoscapejs
npm i cytoscape-sbgn-stylesheet
npm install cytoscape-cola cola
npm i cytoscape-cose-bilkent
npm install @mui/material @emotion/react @emotion/styled
npm i cytoscape-cxtmenu
npm install cytoscape-edgehandles


1. Can it represent the nodes in a layered depiction? - Yes

File: LayeredGraph.js

URL: http://localhost:3000/
Layout : Grid


1. Is the context menu click available over selected node or TLs?
2. Can we highlight any path between source and destination nodes and get its path as an object in any callback? - Yes

File: ClickPopup.js

URL: http://localhost:3000/click
Layout : Grid

4. Is there any plugin to create the circuit just by drawing a stroke(like canvas drawing with free pen tool) over the nodes displayed? 

File: StrokeLine.js
Package: cytoscape-edgehandles
URL: http://localhost:3000/click
Layout : Preset 

5. Are the node icons are customizable with react components or images? - Yes
6. Can we add animations to depict the direction of the data flow between nodes? - Yes

File: StyleSheetGraph.js
URL: http://localhost:3000/sheet
Layout : Breadthfirst

7. Can we show/hide/alter some contents/icons based on the zoom level? -- Yes

File: ZoomFeature.js
URL: http://localhost:3000/zoom
Layout : Preset

8. Can we export the graph as images/pdf? -- Yes

File: ExportPDF.js
URL: http://localhost:3000/pdf
Layout : Preset