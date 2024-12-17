import React, { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import html2pdf from "html2pdf.js";
import {
  faTrash,
  faSave,
  faFileAlt,
  faUpload,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

ChartJS.register(...registerables);

const GraphComponent = () => {
  const chartRef = useRef(null); // Reference to the chart canvas
  const chartInstanceRef = useRef(null); // Reference to the Chart.js instance

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "My Dataset",
        data: [65, 59, 80, 81],
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current = new ChartJS(ctx, {
        type: "line",
        data: data,
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <canvas
      ref={chartRef}
      width={400}
      height={300}
      style={{ border: "1px solid black", display: "block", margin: "auto" }}
    />
  );
};

const DraggableBlock = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 border border-gray-300 bg-white ${
        isDragging ? "bg-blue-200" : "bg-white"
      } cursor-move mb-4`}
    >
      {children}
    </div>
  );
};

const Canvas = ({
  elements,
  setElements,
  selectedElementId,
  setSelectedElementId,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["image", "text", "table", "graph"],
    drop: (item) => addElement(item.type),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const addElement = (type) => {
    setElements((prev) => [...prev, { type, id: Date.now(), selected: false }]);
  };

  const handleSelect = (id) => {
    setElements((prev) =>
      prev.map((element) => ({
        ...element,
        selected: element.id === id,
      }))
    );
    setSelectedElementId(id);
  };

  const TextElement = ({ element, isSelected }) => (
    <div
      key={element.id}
      className={`relative mb-4 ${
        isSelected ? "border-2 border-blue-500" : "border border-gray-300"
      }`}
      onClick={() => handleSelect(element.id)}
    >
      <textarea
        value={element.content || "This is some text"}
        onChange={(e) => {
          setElements((prev) =>
            prev.map((el) =>
              el.id === element.id ? { ...el, content: e.target.value } : el
            )
          );
        }}
        className="border p-2 w-full h-full resize-none"
      />
    </div>
  );

  const ImageElement = ({ element, isSelected }) => (
    <div
      key={element.id}
      className={`relative w-[120px] h-[120px] mb-4 ${
        isSelected ? "border-2 border-blue-500" : "border border-gray-300"
      }`}
      onClick={() => handleSelect(element.id)}
    >
      <img
        src="https://via.placeholder.com/400x300"
        alt="image"
        className="w-full h-full object-cover"
      />
    </div>
  );

  const TableElement = ({ element, isSelected }) => (
    <div
      key={element.id}
      className={`relative mb-4 overflow-auto ${
        isSelected ? "border-2 border-blue-500" : "border border-gray-300"
      }`}
      onClick={() => handleSelect(element.id)}
    >
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Header 1</th>
            <th className="border border-gray-400 p-2">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-400 p-2">Data 1</td>
            <td className="border border-gray-400 p-2">Data 2</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">Data 3</td>
            <td className="border border-gray-400 p-2">Data 4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const GraphElement = ({ element, isSelected }) => (
    <div
      key={element.id}
      className={`relative w-[400px] h-[300px] mb-4 ${
        isSelected ? "border-2 border-blue-500" : "border border-gray-300"
      }`}
      onClick={() => handleSelect(element.id)}
    >
      <GraphComponent />
    </div>
  );

  return (
    <div
      id="editor-container"
      ref={drop}
      className={`w-[800px] h-[1132px] ${
        isOver ? "bg-gray-200" : "bg-white"
      } p-4 border border-gray-300 relative mb-4`}
    >
      {elements.map((element) => {
        const isSelected = element.id === selectedElementId;

        switch (element.type) {
          case "text":
            return (
              <TextElement
                key={element.id}
                element={element}
                isSelected={isSelected}
              />
            );
          case "image":
            return (
              <ImageElement
                key={element.id}
                element={element}
                isSelected={isSelected}
              />
            );
          case "table":
            return (
              <TableElement
                key={element.id}
                element={element}
                isSelected={isSelected}
              />
            );
          case "graph":
            return (
              <GraphElement
                key={element.id}
                element={element}
                isSelected={isSelected}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

const Editor = () => {
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);

  const deleteElement = () => {
    if (selectedElementId) {
      setElements((prev) =>
        prev.filter((element) => element.id !== selectedElementId)
      );
      setSelectedElementId(null);
    }
  };

  const downloadAsPDF = async () => {
    const element = document.getElementById("editor-container");

    // Wait for all images and canvas elements to load
    await Promise.all(
      Array.from(element.getElementsByTagName("img"))
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            })
        )
    );

    // Convert canvas to image
    const canvases = element.getElementsByTagName("canvas");
    Array.from(canvases).forEach((canvas) => {
      const img = new Image();
      img.src = canvas.toDataURL("image/png");
      canvas.parentNode.insertBefore(img, canvas);
      canvas.style.display = "none";
    });

    const options = {
      margin: 10,
      filename: "editor_content.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      await html2pdf().set(options).from(element).save();
      // Restore canvas visibility
      Array.from(canvases).forEach((canvas) => {
        canvas.style.display = "block";
      });
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  const uploadJson = () => {
    console.log("uploadJson");
  };

  const saveTemplate = () => {
    console.log("saveTemplate");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && selectedElementId) {
        deleteElement();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedElementId]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative flex h-screen">
        {/* Left Sidebar with Blocks */}
        <div className="w-1/5 border-r border-gray-300 p-4 bg-gray-50 overflow-y-auto scrollbar-hide scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          <h3 className="font-bold text-lg mb-4">Blocks</h3>
          <DraggableBlock type="text">Text</DraggableBlock>
          <DraggableBlock type="image">Image</DraggableBlock>
          <DraggableBlock type="table">Table</DraggableBlock>
          <DraggableBlock type="graph">Graph</DraggableBlock>
        </div>

        <div className="w-3/5 p-4 bg-gray-200 relative">
          <div className="flex flex-row justify-center gap-10 item-center rounded-md py-2 px-4 mb-2">
            <div className="relative group">
              <button onClick={deleteElement}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  className="text-primary hover:text-red-600 text-gray-400 text-sm"
                />
              </button>
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs text-white bg-gray-600 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-normal max-w-[150px] text-center">
                Delete
              </span>
            </div>

            <div className="relative group">
              <button onClick={downloadAsPDF}>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  size="lg"
                  className="text-primary hover:text-black text-gray-400 text-sm"
                />
              </button>
              <span className="absolute w-28 left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs text-white bg-gray-600 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-normal max-w-[150px] text-center">
                Download json
              </span>
            </div>

            <div className="relative group">
              <button onClick={uploadJson}>
                <FontAwesomeIcon
                  icon={faUpload}
                  size="lg"
                  className="text-primary hover:text-black text-gray-400 text-sm"
                />
              </button>
              <span className="absolute w-28 left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs text-white bg-gray-600 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-normal max-w-[150px] text-center">
                Upload json
              </span>
            </div>
            <div className="relative group">
              <button onClick={saveTemplate}>
                <FontAwesomeIcon
                  icon={faSave}
                  size="lg"
                  className="text-primary hover:text-black text-gray-400 text-sm"
                />
              </button>
              <span className="absolute w-28 left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs text-white bg-gray-600 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-normal max-w-[150px] text-center">
                Save as Template
              </span>
            </div>
          </div>

          <div className="absolute w-[96%] h-[90%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 scrollbar-hide">
            <div id="editor-container">
              <Canvas
                style={{ background: "#000" }}
                elements={elements}
                setElements={setElements}
                selectedElementId={selectedElementId}
                setSelectedElementId={setSelectedElementId}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar for Variables */}
        <div className="w-1/5 border-l border-gray-300 p-4 bg-gray-50">
          <h3 className="font-bold text-lg mb-4">Variables</h3>
          <div className="mb-4">
            <label className="block font-medium">Text Variable</label>
            <input
              type="text"
              placeholder="Enter text"
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Image URL</label>
            <input
              type="text"
              placeholder="Enter image URL"
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Table Data</label>
            <input
              type="text"
              placeholder="Enter table data"
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Editor;
