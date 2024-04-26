import React, { useEffect, useRef } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import net from "../img/internet.webp"; // Make sure the path is correct
import head from "../img/user.jpg"; // Make sure the path is correct
import user from "../img/subUser.png"; // Make sure the path is correct

const StyleSheetGraph = () => {
  const elements = [
    {
      data: { id: "a", image: net },
      style: {
        "background-image": `url(${net})`, // Using ES6 template literals
        "background-fit": "cover",
        "background-clip": "none",
        height: 100, // Specify the size of the node
        width: 100,
      },
    },
    {
      data: { id: "b", image: head },
      style: {
        "background-image": `url(${head})`, // Using ES6 template literals
        "background-fit": "cover",
        "background-clip": "none",
        height: 100, // Specify the size of the node
        width: 100,
      },
    },
    {
      data: { id: "c", image: user },
      style: {
        "background-image": `url(${user})`, // Using ES6 template literals
        "background-fit": "cover",
        "background-clip": "none",
        height: 100, // Specify the size of the node
        width: 100,
      },
    },
    {
      data: { id: "d", image: user },
      style: {
        "background-image": `url(${user})`, // Using ES6 template literals
        "background-fit": "cover",
        "background-clip": "none",
        height: 100, // Specify the size of the node
        width: 100,
      },
    },
    {
      data: { id: "e", image: head },
      style: {
        "background-image": `url(${head})`, // Using ES6 template literals
        "background-fit": "cover",
        "background-clip": "none",
        height: 100, // Specify the size of the node
        width: 100,
      },
    },
    { data: { id: "ae", source: "a", target: "e", weight: 1 } },
    { data: { id: "ab", source: "a", target: "b", weight: 3 } },
    { data: { id: "be", source: "b", target: "e", weight: 4 } },
    { data: { id: "bc", source: "b", target: "c", weight: 5 } },
    { data: { id: "ce", source: "c", target: "e", weight: 6 } },
    { data: { id: "cd", source: "c", target: "d", weight: 2 } },
    { data: { id: "de", source: "d", target: "e", weight: 7 } },
  ];

  const style = [
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(id)",
        color: "#fff",
        "text-outline-color": "#666",
        "text-outline-width": 2,
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
    {
      selector: ".highlighted",
      style: {
        "line-color": "#ff6347",
        "target-arrow-color": "#ff6347",
        width: 10,
      },
    },
  ];

  const layout = { name: "breadthfirst", directed: true, padding: 10 };

  const cyRef = useRef(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (!cyRef.current) {
        return;
      }
      cyRef.current.elements().removeClass("highlighted");
      cyRef.current.elements("edge").eq(i).addClass("highlighted");
      i = (i + 1) % cyRef.current.elements("edge").length;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CytoscapeComponent
      elements={elements}
      style={{ width: "800px", height: "800px" }}
      layout={layout}
      stylesheet={style}
      cy={(cy) => {
        cyRef.current = cy;
      }}
    />
  );
};

export default StyleSheetGraph;
