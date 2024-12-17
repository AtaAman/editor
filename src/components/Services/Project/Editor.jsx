/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import { useLocation } from "react-router-dom";
import { customerBlock } from "./Blocks/CustomerBlock";
import { applicationBlock } from "./Blocks/ApplicationBlock";
import { projecttimelineBlocks } from "./Blocks/ProjectTimelineBlock"
import { termsandconditionBlocks} from "./Blocks/TermsAndCon"
import { whychoseusBlock } from "./Blocks/WhyChoseUsBlock"
import { thankyouBlocks } from "./Blocks/ThankYouBlock"
// import userData from "./Data/UserAndCompanyData.json";
import data from "./Data/Variables.json";

const TemplateEditor = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [isFormVisible, setFormVisible] = useState(false);
  const [proposalName, setProposalName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedVariable, setSelectedVariable] = useState("");
  const [variables, setVariables] = useState(data);

  // useEffect(() => {
  //   if (userData) {
  //     setVariables({
  //       RefrenceNo: userData.ReferenceNo || "",
  //       Date: userData.Date || "",
  //       Size: userData.Size || "",
  //       CustomerName: userData.CustomerName || "",
  //       CustomerPhone: userData.CustomerPhone || "",
  //       CustomerCity: userData.CustomerCity || "",
  //       chartImage: "http://localhost:8000/api/temp-image",
  //       CompanyName: userData.CompanyName || "",
  //       CompanyAddress: userData.CompanyAddress || "",
  //       CompanyPhone: userData.CompanyPhone || "",
  //       CompanyEmail: userData.CompanyEmail || "",
  //       CompanyGST: userData.CompanyGST || "",
  //       CompanyPOC: userData.CompanyPOC || "",
  //       CompanyWebsite: userData.CompanyWebsite || "",
  //     });
  //   }
  // }, []);

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

      blockManager.add("full-container-Application", {
        label: "Application",
        content: applicationBlock,
        category: "Custom Blocks",
      });

      blockManager.add("full-container-project-timeline", {
        label: "Project Timeline",
        content: projecttimelineBlocks,
        category: "Custom Blocks",
      });

      blockManager.add("full-container-terms-and-conditions", {
        label: "Terms and Conditions",
        content: termsandconditionBlocks,
        category: "Custom Blocks",
      });

      blockManager.add("full-container-why-chose-us", {
        label: "why chose us",
        content: whychoseusBlock,
        category: "Custom Blocks",
      });

      blockManager.add("full-container-thank-you", {
        label: "thank you",
        content: thankyouBlocks,
        category: "Custom Blocks",
      })

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

  const handleVariableSelection = (variableName) => {
    if (
      !Object.keys(variables).includes(variableName) ||
      !editorInstance.current
    )
      return;

    const editor = editorInstance.current;
    const selectedComponent = editor.getSelected();

    if (selectedComponent) {
      // Add the variable name as a class to the selected component
      const classes = selectedComponent.getClasses();
      if (!classes.includes(variableName)) {
        selectedComponent.addClass(variableName);
      }
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
        </div>
        <div className="pl-4">
          <input
            type="text"
            placeholder="Search Variable"
            className="border rounded-full pl-4 py-1 mt-2 px-4 bg-[#b1fcf6] w-full"
            list="variables"
            onChange={(e) => setSelectedVariable(e.target.value)}
            onBlur={(e) => handleVariableSelection(e.target.value)}
          />
          <datalist id="variables">
            {Object.keys(variables).map((variable) => (
              <option key={variable} value={variable} />
            ))}
          </datalist>
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
    </div>
  );
};

export default TemplateEditor;
