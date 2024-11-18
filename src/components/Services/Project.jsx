/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import useUserStore from "../../store/useAuthState";

function Project() {
  const navigate = useNavigate();
  const { user, getCurrentUser } = useUserStore();
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    const queryString = new URLSearchParams(formData).toString();
    setTimeout(() => {
      navigate(`/proposal?${queryString}`);
      setIsLoading(false);
    }, 1000);
  };
  const [formData, setFormData] = useState({
    RefrenceNo: "",
    Date: "",
    Size: "",
    CustomerName: "",
    CustomerPhone: "",
    CustomerCity: "",
    chartImage: "http://localhost:8000/api/temp-image",
    CompanyName: "Dummy Company Name",
    CompanyAddress: "123 Company St",
    CompanyPhone: "123-456-7890",
    CompanyEmail: "company@example.com",
    CompanyGST: "GST123456789",
    CompanyPOC: "John Doe",
    CompanyWebsite: "www.company.com",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const loadCompanyData = async () => {
      if (!user) {
        await getCurrentUser();
      }
      if (user && user.company) {
        setFormData((prevData) => ({
          ...prevData,
          CompanyPOC: user.company.poc || "",
          CompanyName: user.company.name || "",
          CompanyPhone: user.company.phone || "",
          CompanyAddress: user.company.address || "",
          CompanyGST: user.company.gst || "",
          CompanyEmail: user.company.email || "",
          CompanyWebsite: user.company.website || "",
        }));
      }
    };

    loadCompanyData();
  }, [user, getCurrentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        Object.entries(formData).forEach(([key, value]) => {
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
      filename: "proposal.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    setIsLoading(true);
    try {
      html2pdf().from(doc.documentElement.outerHTML).set(opt).save();
    } catch (error) {
      console.error("Error during PDF generation:", error);
    } finally {
      setIsLoading(false);
    }
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

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const closePreview = () => {
    setShowPreview(false);
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
          setProposals([]);
        }
      } catch (error) {
        setProposals([]);
      }
    };

    fetchProposals();
  }, []);

  return (
    <div className="relative h-screen flex justify-center items-start py-20 bg-gray-50">
      <section className="px-6 lg:px-24">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-secondary my-4">
            Why Choose Lead2Solar
          </h3>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            About Lead2Solar
          </h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base">
            At Lead2Solar, we connect homeowners and businesses with trusted
            local solar installers, making solar energy accessible and
            affordable. Our focus is on high-quality service, competitive rates,
            and sustainability.
          </p>
          <button
            onClick={toggleFormVisibility}
            className="bg-blue-600 text-white rounded px-4 py-2"
          >
            Create Project
          </button>
        </div>
      </section>

      {isFormVisible && (
        <div className="fixed w-[70%] h-[80%] top-20 bg-white shadow-lg rounded-xl p-10 z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-primary font-bold">
              Create a New Project
            </h2>
            <button
              onClick={toggleFormVisibility}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
          <div className="flex justify-center gap-20 flex-row">
            <div>
              <div className="flex flex-col">
                <label className="font-sm">Reference No</label>
                <input
                  type="text"
                  name="RefrenceNo"
                  value={formData.RefrenceNo}
                  onChange={handleInputChange}
                  className="border text-black rounded px-3 "
                />
              </div>
              <div className="flex flex-col">
                <label className="font-sm">Date</label>
                <input
                  type="date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleInputChange}
                  className="border text-black rounded px-3"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-sm">Size</label>
                <input
                  type="text"
                  name="Size"
                  value={formData.Size}
                  onChange={handleInputChange}
                  className="border text-black rounded px-3"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-sm">Customer Name</label>
                <input
                  type="text"
                  name="CustomerName"
                  value={formData.CustomerName}
                  onChange={handleInputChange}
                  className="border text-black rounded px-3"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-col">
                <label className="font-sm">Customer Phone</label>
                <input
                  type="text"
                  name="CustomerPhone"
                  value={formData.CustomerPhone}
                  onChange={handleInputChange}
                  className="border text-black rounded px-3 "
                />
              </div>

              <div className="flex flex-col">
                <label className="font-sm">Customer City</label>
                <input
                  type="text"
                  name="CustomerCity"
                  value={formData.CustomerCity}
                  onChange={handleInputChange}
                  className="border text-black rounded px-3 "
                />
              </div>

              <div className="my-4">
                <label className="font-sm">Select Proposal</label>
                <select
                  className="border rounded px-3 py-1 w-full"
                  value={selectedProposal}
                  onChange={(e) => setSelectedProposal(e.target.value)}
                >
                  <option value="">Choose a Proposal</option>
                  {proposals.map((proposal) => (
                    <option key={proposal.filename} value={proposal.filename}>
                      {proposal.filename}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handlePreview}
            className="mt-5 bg-blue-600 text-white rounded px-4 py-2"
          >
            {isLoading ? "Loading..." : "Proposal"}
          </button>

          <button
            onClick={handleSubmit}
            className="mt-5 ml-5 bg-blue-600 text-white rounded px-4 py-2"
          >
            {isLoading ? "Loading..." : "Editor"}
          </button>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="spinner border-t-4 border-blue-600 border-solid rounded-full w-16 h-16 animate-spin"></div>
        </div>
      )}

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 w-[90vw] rounded-md h-[90vh] overflow-y-auto">
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDownloadPDFFromPreview}
              className="absolute top-14 right-4 bg-blue-500 text-white rounded-full px-4 py-2"
            >
              {isLoading ? "Loading..." : "Download"}
            </button>
            <h2 className="text-xl font-bold mb-4">Preview</h2>
            <div
              dangerouslySetInnerHTML={{ __html: previewContent }}
              className="bg-white shadow p-4 rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
