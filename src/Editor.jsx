import { useEffect, useRef, useState, useCallback } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import pluginTailwind from "grapesjs-tailwind";
import html2pdf from "html2pdf.js";
import getBlockContent from "./Tamplete1"; // Import the getBlockContent function

const TemplateEditor = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  const [referenceNo, setReferenceNo] = useState("S101");
  const [date, setDate] = useState("12/01/2022");
  const [projectSize, setProjectSize] = useState("10kw");
  const [customerName, setCustomerName] = useState("John Doe");
  const [customerPhone, setCustomerPhone] = useState("123-456-7890");
  const [customerAddress, setCustomerAddress] = useState("123 Main St");
  const [companyPoc, setCompanyPoc] = useState("Jane Doe");
  const [companyName, setCompanyName] = useState("ABC Inc.");
  const [companyPhone, setCompanyPhone] = useState("555-555-5555");
  const [companyAddress, setCompanyAddress] = useState("456 Elm St");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [savedProposals, setSavedProposals] = useState([]);
  const [imageUrl, setImageUrl] = useState(
    "http://localhost:8001/api/temp-image"
  );

  const fetchImage = async () => {
    try {
      const response = await fetch("http://localhost:8001/api/temp-image");
      console.log(response);

      if (!response.ok) {
        throw new Error("Image not found");
      }

      const imageBlob = await response.blob(); // Get the image as a blob
      const imageUrl = URL.createObjectURL(imageBlob); // Create a URL for the blob

      console.log(imageBlob);
      console.log(imageUrl);

      setImageUrl(imageUrl); // Update image source
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    // Fetch the image when component mounts
    fetchImage();
  }, []);

  useEffect(() => {
    // Initialize GrapesJS editor only once
    if (editorRef.current && !editorInstance.current) {
      editorInstance.current = grapesjs.init({
        container: editorRef.current,
        height: "91vh",
        width: "85vw",
        storageManager: { autoload: 0 },
        plugins: [pluginTailwind],
        pluginsOpts: {
          "grapesjs-tailwind": {},
        },
      });

      // Wait until the image URL is available
      if (imageUrl) {
        const initialContent = getBlockContent(
          referenceNo,
          date,
          projectSize,
          customerName,
          customerPhone,
          customerAddress,
          companyName,
          companyPhone,
          companyAddress,
          companyPoc,
          imageUrl
        );

        // Add Template1 block by default
        editorInstance.current.BlockManager.add("a4-docx-block", {
          id: "a4-docx-block",
          label: "Template1",
          attributes: { class: "fa fa-file" },
          content: initialContent,
        });

        // Load default content on canvas
        editorInstance.current.setComponents(initialContent);
      }
    }
  }, [
    referenceNo,
    date,
    projectSize,
    customerName,
    customerPhone,
    customerAddress,
    companyName,
    companyPoc,
    companyPhone,
    companyAddress,
    imageUrl,
  ]); // Depend on imageUrl to re-run when the image is fetched

  useEffect(() => {
    // Fetch saved proposals from the backend
    const fetchSavedProposalsFromBackend = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/get-proposals");
        const proposals = await response.json();
        setSavedProposals(proposals);
      } catch (error) {
        console.error("Error fetching saved proposals:", error);
      }
    };

    fetchSavedProposalsFromBackend();
  }, []);

  // const handleSaveAsJSON = async () => {
  //   if (!editorInstance.current) return;

  //   // Get components and styles from the editor
  //   const components = editorInstance.current.getComponents();
  //   const styles = editorInstance.current.getCss();

  //   // Create a JSON structure to store proposal data
  //   const proposalData = {
  //     referenceNo,
  //     date,
  //     projectSize,
  //     customerName,
  //     customerPhone,
  //     customerAddress,
  //     companyPoc,
  //     companyName,
  //     companyPhone,
  //     companyAddress,
  //     components, // This might be an array of components, so be mindful of how it's handled
  //     styles, // CSS styles as a string
  //     imageUrl, // Ensure imageUrl is a valid URL or base64 string if it's an image
  //   };

  //   // Get the filename from the user
  //   const filename =
  //     prompt("Enter a name for the proposal (e.g., proposal1):") || "proposal";

  //   // Structure the proposal data with the filename and content
  //   const proposal = {
  //     filename,
  //     content: proposalData, // Content holds all the details of the proposal
  //   };

  //   // Save proposal to the backend
  //   await saveProposalToBackend(proposal);

  //   // Update state with new proposal in the saved proposals list
  //   setSavedProposals((prev) => [...prev, proposal]);

  //   // Log and alert to indicate successful save
  //   console.log(proposal);
  //   alert(`Proposal "${filename}" saved successfully as JSON!`);
  // };

  // const saveProposalToBackend = async (proposal) => {
  //   try {
  //     const response = await fetch("http://localhost:8001/api/save-proposal", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(proposal), // Ensure the correct data format
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(
  //         `Failed to save proposal: ${errorData.error || "Unknown error"}`
  //       );
  //     }

  //     console.log("Proposal saved!");
  //   } catch (error) {
  //     console.error("Error saving proposal:", error.message);
  //   }
  // };

  // const handleLoadProposal = (proposalContent) => {
  //   if (editorInstance.current) {
  //     const {
  //       components,
  //       styles,
  //       referenceNo,
  //       date,
  //       projectSize,
  //       customerName,
  //       customerPhone,
  //       customerAddress,
  //       companyName,
  //       companyAddress,
  //       companyPhone,
  //       companyPoc,
  //       imageUrl,
  //     } = proposalContent;

  //     // Update input fields based on loaded proposal

  //     setReferenceNo(proposalContent.referenceNo);
  //     setDate(proposalContent.date);
  //     setProjectSize(proposalContent.projectSize);
  //     setCustomerName(proposalContent.customerName);
  //     setCustomerPhone(proposalContent.customerPhone);
  //     setCustomerAddress(proposalContent.customerAddress);
  //     setCompanyName(proposalContent.companyName);
  //     setCompanyAddress(proposalContent.companyAddress);
  //     setCompanyPhone(proposalContent.companyPhone);
  //     setCompanyPoc(proposalContent.companyPoc);

  //     setImageUrl(imageUrl);

  //     // Set the components and styles in the editor
  //     editorInstance.current.setComponents(components);
  //     editorInstance.current.setStyle(styles);
  //   }
  // };

  useEffect(() => {
    // Update editor canvas content whenever input fields change
    if (editorInstance.current) {
      const updatedContent = getBlockContent(
        referenceNo,
        date,
        projectSize,
        customerName,
        customerPhone,
        customerAddress,
        companyName,
        companyAddress,
        companyPhone,
        companyPoc,
        imageUrl
      );
      editorInstance.current.setComponents(updatedContent);
    }
  }, [
    referenceNo,
    date,
    projectSize,
    customerName,
    customerPhone,
    customerAddress,
    companyName,
    companyAddress,
    companyPhone,
    companyPoc,
    imageUrl,
  ]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "referenceNo") setReferenceNo(value);
    if (name === "date") setDate(value);
    if (name === "projectSize") setProjectSize(value);
    if (name === "customerName") setCustomerName(value);
    if (name === "customerPhone") setCustomerPhone(value);
    if (name === "customerAddress") setCustomerAddress(value);
    if (name === "companyName") setCompanyName(value);
    if (name === "companyAddress") setCompanyAddress(value);
    if (name === "companyPhone") setCompanyPhone(value);
    if (name === "companyPoc") setCompanyPoc(value);
  }, []);

  const handleFormSubmit = () => setFormSubmitted(true);

  const handleDownloadPDF = () => {
    if (!editorInstance.current) return;

    const canvasElement =
      editorRef.current?.querySelector(".gjs-frame")?.contentDocument?.body;

    if (canvasElement) {
      const opt = {
        margin: 0,
        filename: "generated-template.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf().from(canvasElement).set(opt).save();
    }
  };

  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-[35%]">
        <div className="pl-4">
          <div className="">
            <p className="text-sm py-1 text-purple-300">Reference No::</p>
            <input
              id="referenceNo"
              type="text"
              name="referenceNo"
              value={referenceNo}
              onChange={handleInputChange}
              className="border px-4 w-[70%] rounded-full"
            />
          </div>
          <div className="">
            <p className="text-sm py-1 text-purple-300">Date:</p>
            <input
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={handleInputChange}
              className="border px-4 w-[70%] rounded-full"
            />
          </div>
          <div className="">
            <p className="text-sm py-1 text-purple-300">Project Size:</p>
            <input
              id="projectSize"
              type="text"
              name="projectSize"
              value={projectSize}
              onChange={handleInputChange}
              className="border px-4 w-[70%] rounded-full"
            />
          </div>
          <div className="">
            <p className="text-sm py-1 text-purple-300">Customer Name:</p>
            <input
              id="customerName"
              type="text"
              name="customerName"
              value={customerName}
              onChange={handleInputChange}
              className="border px-4 w-[70%] rounded-full"
            />
          </div>
          <div className="">
            <p className="text-sm py-1 text-purple-300">Customer Phone:</p>
            <input
              id="customerPhone"
              type="tel"
              name="customerPhone"
              value={customerPhone}
              onChange={handleInputChange}
              className="border px-4 w-[70%] rounded-full"
            />
          </div>
          <div className="">
            <p className="text-sm py-1 text-purple-300">Customer Address:</p>
            <input
              id="customerAddress"
              type="text"
              name="customerAddress"
              value={customerAddress}
              onChange={handleInputChange}
              className="border px-4 w-[70%] rounded-full"
            />
          </div>
          <div className="">
            <p className="text-sm py-1 text-purple-300">Company Name:</p>
            <input
              id="companyName"
              type="text"
              name="companyName"
              value={companyName}
              onChange={handleInputChange}
              className="border px-4 w-[70%] rounded-full"
            />
          </div>
          <div className="">
            <p className="text-sm py-1 text-purple-300">Company address:</p>
            <input
              id="companyAddress"
              type="text"
              name="companyAddress"
              value={companyAddress}
              onChange={handleInputChange}
              className="border px-4 w-[70%] rounded-full"
            />
          </div>
          <div className="">
            <p className="text-sm py-1 text-purple-300">Phone number:</p>
            <input
              id="companyPhone"
              type="tel"
              name="companyPhone"
              value={companyPhone}
              onChange={handleInputChange}
              className="border px-4 w-[70%] rounded-full"
            />
          </div>
          <div className="">
            <p className="text-sm py-1 text-purple-300">Company POC:</p>
            <input
              id="companyPoc"
              type="text"
              name="companyPoc"
              value={companyPoc}
              onChange={handleInputChange}
              className="border px-4 w-[70%] rounded-full"
            />
          </div>
          <button
            onClick={handleFormSubmit}
            className="border rounded-full pl-4 py-1 mt-4 px-4 bg-yellow-700 text-white"
          >
            Submit
          </button>
        </div>

        {/* <div className="mt-2 pl-4">
          <button
            onClick={handleSaveAsJSON}
            className="border rounded-full py-1 px-4 bg-yellow-700 text-white"
          >
            Save Proposal
          </button>
        </div>
        <div className="pl-4 mt-2">
          <select
            className="border rounded-full py-1 px-4 bg-yellow-700 text-white"
            onChange={(e) => handleLoadProposal(JSON.parse(e.target.value))}
          >
            <option value="">Select Proposal</option>
            {savedProposals.map((proposal, index) => (
              <option key={index} value={JSON.stringify(proposal.content)}>
                {proposal.filename}
              </option>
            ))}
          </select>
        </div> */}



      </div>

      <div>
        <div ref={editorRef} className="editor-container"></div>

        <div className="p-2">
          <button
            onClick={handleDownloadPDF}
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
