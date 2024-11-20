/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";
import { customerBlock } from './Blocks/CustomerBlock';
import { applicationBlock } from "./Blocks/ApplicationBlock";
import { whychoseusBlock } from "./Blocks/WhyChoseUsBlock";
import { projecttimelineBlocks } from "./Blocks/ProjectTimelineBlock";
import { termsandconditionBlocks } from "./Blocks/TermsAndCon";
import { thankyouBlocks } from "./Blocks/ThankYouBlock";
import userData from './Data/UserAndCompanyData.json';

const TemplateEditor = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [isFormVisible, setFormVisible] = useState(false);
  const [proposalName, setProposalName] = useState("");
  const [message, setMessage] = useState("");
  

  const [variables, setVariables] = useState({
    RefrenceNo: '',
    Date: '',
    Size: '',
    CustomerName: '',
    CustomerPhone: '',
    CustomerCity: '',
    chartImage: '',
    CompanyName: '',
    CompanyAddress: '',
    CompanyPhone: '',
    CompanyEmail: '',
    CompanyGST: '',
    CompanyPOC: '',
    CompanyWebsite: '',
  });

  useEffect(() => {
    if (userData) {
      setVariables({
        RefrenceNo: userData.ReferenceNo || '',
        Date: userData.Date || '',
        Size: userData.Size || '',
        CustomerName: userData.CustomerName || '',
        CustomerPhone: userData.CustomerPhone || '',
        CustomerCity: userData.CustomerCity || '',
        chartImage: "http://localhost:8000/api/temp-image",
        CompanyName: userData.CompanyName || '',
        CompanyAddress: userData.CompanyAddress || '',
        CompanyPhone: userData.CompanyPhone || '',
        CompanyEmail: userData.CompanyEmail || '',
        CompanyGST: userData.CompanyGST || '',
        CompanyPOC: userData.CompanyPOC || '',
        CompanyWebsite: userData.CompanyWebsite || '',
      });
    }
  }, []);


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

      blockManager.add("full-container-body", {
        label: "body",
        content: `
           <div style="width: 100%; height: 100%; display: flex; align-items: center; flex-direction: column; justify-content: center; background-color: #b1fcf6;">
           <div style="width: 210mm; height: 297mm; background-color: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;"></div>
           </div>
        `,
        category: "Custom Blocks",
      });

      blockManager.add("full-container-a4", {
        label: "A4 page",
        content: `
           <div style="width: 210mm; height: 297mm; background-color: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;"></div>
        `,
        category: "Custom Blocks",
      });

      blockManager.add("full-container-customer-details", {
        label: "Customer and Company",
        content: customerBlock,
        category: "Custom Blocks",
      });

      blockManager.add("full-container-application-details", {
        label: "Application",
        content:applicationBlock,
        category: "Custom Blocks",
      });

      blockManager.add("full-container-whychooseus", {
        label: "why choose us",
        content: whychoseusBlock,

        category: "Custom Blocks",
      });

      blockManager.add("full-container-Timeline", {
        label: "Project timeline",
        content: projecttimelineBlocks,

        category: "Custom Blocks",
      });

      blockManager.add("full-container-TandC", {
        label: "Terms and Conditions",
        content: termsandconditionBlocks,

        category: "Custom Blocks",
      });

      blockManager.add("full-container-thankyou", {
        label: "Thank You",
        content: thankyouBlocks,

        category: "Custom Blocks",
      });

      blockManager.add("full-container-image", {
        label: "ChartImage",
        content: `
          <div style="width: 40%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f7fafc;">
            <div style="background-color: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
              <img src="{{chartImage}}" alt="Chart Image" style="width: 100%; height: auto; object-fit: contain;" />
            </div>
          </div>
        `,
        category: "Custom Blocks",
      });

      editor.on("component:update", () => {
        const htmlContent = editor.getHtml();
        const cssContent = editor.getCss();
        localStorage.setItem(
          "editorContent",
          JSON.stringify({ html: htmlContent, css: cssContent })
        );
      });
    }
  }, []);

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent && editorInstance.current) {
      const { html, css } = JSON.parse(savedContent);
      editorInstance.current.setComponents(html);
      editorInstance.current.setStyle(css);
    }
  }, []);

  const handleSaveContent = () => {
    if (editorInstance.current) {
      const htmlContent = editorInstance.current.getHtml();
      const cssContent = editorInstance.current.getCss();
      localStorage.setItem(
        "editorContent",
        JSON.stringify({ html: htmlContent, css: cssContent })
      );
      alert("Content saved!");
    }
  };

  const handleDownloadPDFFromEditor = async () => {
    if (!editorInstance.current) return;
    const htmlContent = editorInstance.current.getHtml();
    const cssContent = editorInstance.current.getCss();
    const inlineStyle = `
      <style>
        .chartImage {
          justify-content: center;
          width: 600px; 
          height: 300px; 
          display: block;
          margin: 0 auto;
          border: 2px solid #ccc; 
          padding: 5px; 
          background-color: #f9f9f9;
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
      filename: "proposal.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(doc.documentElement.outerHTML).set(opt).save();
  };

  const handleDownloadPDFFromPreview = async () => {
    if (!previewContent) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(previewContent, "text/html");

    const images = Array.from(doc.querySelectorAll("img"));
    images.forEach((img) => {
      console.log(`Image src: ${img.src}, Loaded: ${img.complete}`);
    });

    const inlineStyle = `
      <style>
        .chartImage {
          justify-content: center;
          width: 600px;
          height: 300px;
          display: block;
          margin: 0 auto; 
          border: 2px solid #ccc;
          padding: 5px;
          background-color: #f9f9f9;
        }
      </style>
    `;

    const head = doc.querySelector("head");
    const styleElement = document.createElement("style");
    styleElement.innerHTML = inlineStyle;
    head.appendChild(styleElement);

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

    const chartBase64 = generateChartBase64();
    if (chartBase64) {
      const chartImage = doc.querySelector(".chartImage");
      if (chartImage) {
        chartImage.src = chartBase64;
      }
    }

    console.log("Final HTML for PDF:", doc.documentElement.outerHTML);
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

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/proposal/save-html",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: proposalName,
            content: fullContent,
          }),
        }
      );

      if (response.ok) {
        alert(`Proposal "${proposalName}" saved successfully with CSS!`);
        setFormVisible(false);
        setProposalName("");
      } else {
        alert("Error saving proposal.");
      }
    } catch (error) {
      console.error("Error saving proposal:", error);
      alert("Failed to save proposal.");
    }
  };

  const handlePreview = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = async (event) => {
    const filename = event.target.value;
    setSelectedProposal(filename);

    if (filename) {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="w-full h-auto flex flex-row">
      <div className="w-[15%]">
        <div className="pl-4">
          <button
            onClick={handleSaveContent}
            className="border rounded-full pl-4 py-1 mt-2 px-4 bg-[#b1fcf6]"
          >
            Save
          </button>
        </div>
        <div className="pl-4">
          <select
            className="border rounded-full pl-4 py-1 mt-2 px-4 bg-[#b1fcf6]"
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
        <div className="pl-4">
          <button
            onClick={handlePreview}
            className="border rounded-full pl-4 py-1 mt-2 px-4 bg-[#b1fcf6] "
          >
            Preview
          </button>

          {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="spinner border-t-4 border-blue-600 border-solid rounded-full w-16 h-16 animate-spin"></div>
            </div>
          )}

          <button
            onClick={() => setFormVisible(true)}
            className="border rounded-full pl-4 py-1 mt-2 px-4 bg-[#b1fcf6] "
          >
            Save Tamplate
          </button>

          <div className="mt-2">
            <button
              onClick={handleDownloadPDFFromEditor}
              className="border rounded-full py-1 px-4 bg-[#b1fcf6] "
            >
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-full">
        <div
          ref={editorRef}
          className="editor-container relative w-full h-full"
        ></div>
        {isFormVisible && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">Save Proposal</h2>
              <input
                type="text"
                value={proposalName}
                onChange={(e) => setProposalName(e.target.value)}
                placeholder="Enter proposal name"
                className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setFormVisible(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAsHTML}
                  className="bg-[#b1fcf6] text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
              {message && (
                <p className="mt-4 text-sm text-center text-green-600">
                  {message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 w-[90vw] h-[90vh] overflow-y-auto">
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 bg-[#b1fcf6]  rounded-full px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDownloadPDFFromPreview}
              className="absolute top-15 right-4 bg-[#b1fcf6] rounded-full px-4 py-2"
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
    </div>
  );
};

export default TemplateEditor;
