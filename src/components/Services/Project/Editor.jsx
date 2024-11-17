/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";
const TemplateEditor = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [variables, setVariables] = useState({
    RefrenceNo: params.get("RefrenceNo"),
    Date: params.get("Date"),
    Size: params.get("Size"),
    CustomerName: params.get("CustomerName"),
    CustomerPhone: params.get("CustomerPhone"),
    CustomerCity: params.get("CustomerCity"),
    chartImage: "http://localhost:8000/api/temp-image",
    CompanyName: "Dummy Company Name",
    CompanyAddress: "123 Company St",
    CompanyPhone: "123-456-7890",
    CompanyEmail: "company@example.com",
    CompanyGST: "GST123456789",
    CompanyPOC: "John Doe",
    CompanyWebsite: "www.company.com",
  });

  useEffect(() => {
    if (editorRef.current && !editorInstance.current) {
      editorInstance.current = grapesjs.init({
        container: editorRef.current,
        height: "100vh",
        width: "85vw",
        storageManager: { autoload: 0 },
        plugins: [gjsBlocksBasic],
      });

      const editor = editorInstance.current;
      const blockManager = editor.BlockManager;

      blockManager.add("full-container-a4", {
        label: "Full Container with A4",
        content: `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f7fafc;">
        <div style="width: 210mm; height: 297mm; background-color: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;"></div>
        </div>
        `,
        category: "Custom Blocks",
      });
      blockManager.add("full-container-image", {
        label: "Full Container for chart",
        content: `
          <div style="width: 40%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f7fafc;">
            <div style="background-color: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
              <img src="{{chartImage}}" alt="Chart Image" style="width: 100%; height: auto; object-fit: contain;" />
            </div>
          </div>
        `,
        category: "Custom Blocks",
      });
    }
  }, []);

  const handleDownloadPDFFromEditor = async () => {
    if (!editorInstance.current) return;
    const htmlContent = editorInstance.current.getHtml();
    const cssContent = editorInstance.current.getCss();
    const inlineStyle = `
      <style>
        .chartImage {
          justify-content: center;
          width: 600px; /* Fixed width for the chart */
          height: 300px; /* Fixed height for the chart */
          display: block;
          margin: 0 auto; /* Center the chart */
          border: 2px solid #ccc; /* Optional: Add border */
          padding: 5px; /* Optional: Add padding */
          background-color: #f9f9f9; /* Optional: Add background */
        }
      </style>
    `;
    const fullContent = `
      <html>
        <head>
          <style>${cssContent}</style>
          ${inlineStyle} <!-- Add only the chart styles -->
        </head>
        <body>${htmlContent}</body>
      </html>
    `;
    const parser = new DOMParser();
    const doc = parser.parseFromString(fullContent, "text/html");
    const images = Array.from(doc.querySelectorAll("img"));

    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve;
            }
          })
      )
    );
    const opt = {
      margin: 0,
      filename: "editor-template.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(doc.documentElement.outerHTML).set(opt).save();
  };

  const handleDownloadPDFFromPreview = async () => {
    if (!previewContent) return;

    // Parse the preview content
    const parser = new DOMParser();
    const doc = parser.parseFromString(previewContent, "text/html");

    // Log all images to ensure they're present in the DOM
    const images = Array.from(doc.querySelectorAll("img"));
    images.forEach((img) => {
      console.log(`Image src: ${img.src}, Loaded: ${img.complete}`);
    });

    // Add specific styles for the chart image
    const inlineStyle = `
      <style>
        .chartImage {
          justify-content: center;
          width: 600px; /* Fixed width for the chart */
          height: 300px; /* Fixed height for the chart */
          display: block;
          margin: 0 auto; /* Center the chart */
          border: 2px solid #ccc; /* Optional: Add border */
          padding: 5px; /* Optional: Add padding */
          background-color: #f9f9f9; /* Optional: Add background */
        }
      </style>
    `;

    // Add the specific chart styles to the head
    const head = doc.querySelector("head");
    const styleElement = document.createElement("style");
    styleElement.innerHTML = inlineStyle;
    head.appendChild(styleElement);

    // Ensure all images are fully loaded before proceeding
    await Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = resolve;
              img.onerror = resolve; // Handle load errors gracefully
            }
          })
      )
    );

    // Ensure that dynamically created images, like charts, are properly encoded in Base64
    const chartBase64 = generateChartBase64();
    if (chartBase64) {
      // Find the chart image in the DOM and update its source with Base64 if necessary
      const chartImage = doc.querySelector(".chartImage");
      if (chartImage) {
        chartImage.src = chartBase64; // Update the chart image src with the Base64 encoded image
      }
    }

    // Debug: Log the final HTML being passed to html2pdf
    console.log("Final HTML for PDF:", doc.documentElement.outerHTML);

    // Set options for html2pdf
    const opt = {
      margin: 0,
      filename: "preview-template.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(doc.documentElement.outerHTML).set(opt).save();
  };
  const generateChartBase64 = () => {
    const chartCanvas = document.getElementById("chartCanvas");
    if (chartCanvas) {
      const base64Image = chartCanvas.toDataURL("image/png");
      console.log("Generated Base64 Image:", base64Image);
      return base64Image;
    } else {
      console.error("Chart canvas not found!");
      return null;
    }
  };

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/proposal/proposals"
        );
        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          setProposals(data.data);
        } else {
          console.error("Unexpected data structure:", data);
          setProposals([]);
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
        setProposals([]);
      }
    };

    fetchProposals();
  }, []);

  const handleSaveAsHTML = async () => {
    if (!editorInstance.current) return;

    const htmlContent = editorInstance.current.getHtml();
    const cssContent = editorInstance.current.getCss();

    const fullContent = `
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `;
    const filename =
      prompt("Enter a name for the proposal (e.g., proposal1):") || "proposal";

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/proposal/save-html",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filename, content: fullContent }),
        }
      );

      if (response.ok) {
        alert(`Proposal "${filename}" saved successfully with CSS!`);
      } else {
        alert("Error saving proposal.");
      }
    } catch (error) {
      console.error("Error saving proposal:", error);
      alert("Failed to save proposal.");
    }
  };
  const handlePreview = async () => {
    try {
      const response = await fetch(`
        http://localhost:8000/api/v1/proposal/get-html/${selectedProposal}`);
      const proposal = await response.json();
      console.log("Proposal data:", proposal);

      if (
        proposal?.data?.content &&
        typeof proposal.data.content === "string"
      ) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(proposal.data.content, "text/html");
        Object.entries(variables).forEach(([key, value]) => {
          const elements = doc.querySelectorAll(`.${key}`);
          elements.forEach((element) => {
            if (element.tagName === "IMG") {
              element.src = value;
            } else {
              element.textContent = value;
            }
          });
        });
        setPreviewContent(doc.documentElement.outerHTML);
        setShowPreview(true);
      } else {
        console.error("Invalid or missing content in proposal:", proposal);
      }
    } catch (error) {
      console.error("Error fetching proposal content:", error);
    }
  };

  const handleSelectChange = async (event) => {
    const filename = event.target.value;
    setSelectedProposal(filename);

    if (filename) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/proposal/get-html/${filename}`
        );
        const proposal = await response.json();

        if (
          proposal?.data?.content &&
          typeof proposal.data.content === "string"
        ) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(
            proposal.data.content,
            "text/html"
          );
          Object.entries(variables).forEach(([key, value]) => {
            const elements = doc.querySelectorAll(`.${key}`);
            elements.forEach((element) => {
              if (element.tagName === "IMG") {
                element.src = value;
              } else {
                element.textContent = value;
              }
            });
          });

          if (editorInstance.current) {
            editorInstance.current.setComponents(doc.documentElement.outerHTML);
          }
        } else {
          console.error("Invalid or missing content in proposal:", proposal);
        }
      } catch (error) {
        console.error("Error fetching proposal content:", error);
      }
    }
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-[35%]">
        <div className="pl-4">
          <button
            onClick={handlePreview}
            className="border rounded-full pl-4 py-1 mt-2 px-4 bg-yellow-700 text-white"
          >
            Preview
          </button>

          <button
            onClick={handleSaveAsHTML}
            className="border rounded-full pl-4 py-1 mt-2 px-4 bg-yellow-700 text-white"
          >
            Save proposal
          </button>
          <div>
            <select
              className="border rounded-full pl-4 py-1 mt-2 px-4 bg-yellow-700 text-white"
              id="proposal-dropdown"
              value={selectedProposal}
              onChange={handleSelectChange}
            >
              <option value="">Templates</option>
              {Array.isArray(proposals) &&
                proposals.map((proposal) => (
                  <option key={proposal.filename} value={proposal.filename}>
                    {proposal.filename}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 w-[90vw] h-[90vh] overflow-y-auto">
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDownloadPDFFromPreview}
              className="absolute top-15 right-4 bg-red-500 text-white rounded-full px-4 py-2"
            >
              Download
            </button>

            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div
              dangerouslySetInnerHTML={{ __html: previewContent }}
              className="bg-white shadow p-4 rounded-lg"
            ></div>
          </div>
        </div>
      )}

      <div>
        <div ref={editorRef} className="editor-container"></div>

        <div className="p-2">
          <button
            onClick={handleDownloadPDFFromEditor}
            className="border rounded-full py-1 px-4 bg-yellow-700 text-white"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;
