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
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [isFormVisible, setFormVisible] = useState(false);
  const [proposalName, setProposalName] = useState("");
  const [message, setMessage] = useState("");

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
        content: `
          <div style="width: 450px; height: 500px; margin-top: 60%; margin-left: 10%; display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">
            <div style="margin-bottom: 2px;">
              <div style="font-size: 16px; font-weight: 600; display: flex; align-items: center; margin-bottom: 0.5rem;">
                <p style="margin: 0;">Ref No:</p>&nbsp;<span class="RefrenceNo">S102</span>
              </div>
              <div style="font-size: 16px; font-weight: 600; display: flex; align-items: center; margin-bottom: 0.5rem;">
                <p style="margin: 0;">Date:</p>&nbsp;<span class="Date">10-12-2024</span>
              </div>
            </div>
            <div>
              <div style="font-size: 28px; color: #e63946; font-weight: 600; display: flex; align-items: center;">
                <p class="Size" style="margin: 0;">10</p>&nbsp;<span>Kw</span>
              </div>
              <h1 style="font-size: 28px; color: #e63946; font-weight: 600; margin-bottom: 2px;">
                Solar Proposal
              </h1>
            </div>

            <div style="margin-bottom: 2px;">
              <h2 style="font-size: 18px; font-weight: 600;">Prepared For:</h2>
              <div style="font-size: 15px;  display: flex; align-items: center;">
                <span class="CustomerName">John Deo</span>&nbsp;
                <p style="margin: 0;">,</p>
              </div>
              <div style="font-size: 15px; display: flex; align-items: center;">
                <span class="CustomerPhone">8967328873</span>&nbsp;
                <p style="margin: 0;">,</p>
              </div>
              <div style="font-size: 15px;  display: flex; align-items: center;">
                <span class="CustomerCity">Jamia Nagar, Okhla, New Delhi, 110025</span>&nbsp;
                <p style="margin: 0;">.</p>
              </div>
            </div>

            <div style="margin-bottom: 2px;">
              <h2 style="font-size: 18px; font-weight: 600;">Prepared By:</h2>
              <div style="font-size: 15px;  display: flex; align-items: center; ">
                <span class="CompanyPoc">Steve</span>&nbsp;
                <p style="margin: 0;">,</p>
              </div>
              <div style="font-size: 15px; display: flex; align-items: center;">
                <span class="CompanyName">Lead2solar</span>&nbsp;
                <p style="margin: 0;">,</p>
              </div>
              <div style="font-size: 15px;  display: flex; align-items: center;">
                <span class="CompanyPhone">9964537294</span>&nbsp;
                <p style="margin: 0;">,</p>
              </div>
              <div style="font-size: 15px;  display: flex; align-items: center;">
                <span class="CompanyAddress">Prabhu Kripa, Tilak Rd., Rajawadi, Ghatkoper (east) · Mumbai · Maharashtra, 400077</span>&nbsp;
                <p style="margin: 0;">.</p>
              </div>
            </div>
          </div>
        `,

        category: "Custom Blocks",
      });

      blockManager.add("full-container-application-details", {
        label: "Application",
        content: `
          <div style="width: 210mm; height: 297mm; color: black; display: flex; flex-direction: column; gap: 24px; padding: 0 56px; justify-content: center;">
            <div style="width: 100%; padding: 16px 0;">
              <h1 style="text-decoration: underline; color: #e63946; font-weight: bold; font-size: 24px;">
                Welcome
              </h1>
            </div>

            <div style="display: flex; width: 100%; justify-content: space-between;">
              <div style="font-size: 16px; font-weight: 600; display: flex; align-items: center; margin-bottom: 0.5rem;">
                <p style="margin: 0;">Offer No:</p>&nbsp;
                <span class="RefrenceNo">S102</span>
              </div>
              <div style="font-size: 16px; font-weight: 600; display: flex; align-items: center; margin-bottom: 0.5rem;">
                <p style="margin: 0;">Date:</p>&nbsp;<span class="Date">10-12-2024</span>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; justify-content: space-between;">
              <p style="margin: 0;">To,</p>
              <div style="font-size: 15px;  display: flex; align-items: center;">
                <span class="CustomerName">John Deo</span>&nbsp;
                <p style="margin: 0;">,</p>
              </div>
              <div style="font-size: 15px;  display: flex; align-items: center;">
                <span class="CustomerCity">Jamia Nagar, Okhla, New Delhi, 110025</span>&nbsp;
                <p style="margin: 0;">.</p>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; justify-content: space-center;">
              <p style="margin: 0;">
                Sub:
                <span style="text-decoration: underline;">
                  Proposal for Supply & Installation of
                  <span style="color: #e63946; font-weight: 600; display: inline-flex; align-items: end;">
                    <span class="Size" style="margin: 0;">10</span>&nbsp;
                    <span>Kw</span>
                  </span>
                  Grid Connected Solar PV Power Plant.
                </span>
              </p>
            </div>

            <div>
              <p style="margin: 0;">
                With reference to the above-mentioned subject, we are very much
                thankful to you for showing your interest in our service. Based
                on the information provided by you, we are pleased to quote our
                offer for the supply & installation of a Grid Connected Solar PV
                Power Plant.
              </p>
            </div>

            <div>
              <p style="margin: 0;">
                Inter-connected with the electric utility grid or the meters,
                these systems are also called ‘Grid-Tie Systems’. The DC power
                is converted into AC power by an inverter. These systems allow
                users to mobilize the energy provided by the Sun and feed the
                leftovers to the grid, which helps in cutting down costs. During
                the evening or in the absence of sunlight, power can be drawn
                from the grid, thus eliminating the need for battery banks.
              </p>
            </div>

            <div>
              <p style="font-weight: bold; margin: 0;">The benefits include:</p>
              <div style="padding: 20px; margin-top: 8px;">
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">
                    Limitless power supply which is free of cost.
                  </p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">
                    Net metering in ‘Grid-Tie Systems’ helps in calculating
                    exported surplus power to the grid, which contributes to a
                    reduction in your electricity bill.
                  </p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">
                    It is easy to maintain and low on operation investments.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p style="margin: 0;">Thanks & Regards,</p>
            </div>

            <div>
              <div style="font-size: 15px;  display: flex; align-items: center; margin-bottom: 0.5rem;">
                <span class="CompanyPoc">Steve</span>&nbsp;
                <p style="margin: 0;">,</p>
              </div>
              <div style="font-size: 15px; display: flex; align-items: center; margin-bottom: 0.5rem;">
                <span class="CompanyName">Lead2solar</span>&nbsp;
                <p style="margin: 0;">,</p>
              </div>
              <div style="font-size: 15px;  display: flex; align-items: center; margin-bottom: 0.5rem;">
                <span class="CompanyPhone">9834638476</span>&nbsp;
                <p style="margin: 0;">,</p>
              </div>
            </div>
          </div>
        `,

        category: "Custom Blocks",
      });

      blockManager.add("full-container-whychooseus", {
        label: "why choose us",
        content: `
          <div style="width: 210mm; height: 297mm; color: black; display: flex; flex-direction: column; gap: 24px; padding: 0 56px; justify-content: center;">
            <div style="width: 100%; padding: 16px 0;">
              <h1 style="text-align: start; text-decoration: underline;  color: #e63946; font-weight: bold; font-size: 24px;">
                On Grid Solar PV Systems
              </h1>
              <p style="text-align: start; text-decoration: underline;  color: #e63946; margin: 0; font-weight: bold;">
                (Diagram for reference)
              </p>
            </div>

            <div style="text-align: center; margin: 16px 0;">
              <img
                src="/whychooseus.jpg"
                alt="On Grid Solar PV Diagram"
                style="width: 100%; height: 300px;"
              />
            </div>

            <div>
              <h2 style="color: #000; font-size: 18px; margin-bottom: 8px; display: flex; align-items: center;">
                Why <span class="CompanyName" style="font-size: 18px; font-weight: bold; margin-left: 0.5rem;">M/S SAI KRIPA ENTERPRISE</span> !!
              </h2>
              <div style="margin: 0; padding-left: 20px; color: #333; font-size: 16px; line-height: 1.5;">
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">
                    We are MNRE approved EPC Vendor.
                  </p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">
                    We are authorized by MGVCL, PGVCL, DGVCL, UGVCL, GEDA, Torrent Power,
                    GUVNL, etc.
                  </p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">
                    Zero maintenance cost with savings on your Electricity Bill &
                    Environment.
                  </p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">
                    Vast area covers in Vadodara, Dahod, Panchmahal & Chhotaudepur for Solar
                    system work with so many happy & satisfied clients.
                  </p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">
                    Transparent business with Quick & Reliable Installation.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 style="color: #000; font-size: 18px; margin-bottom: 8px; display: flex; align-items: center;">
                Solar Components:
              </h2>
              <div style="margin: 0; padding-left: 20px; color: #333; font-size: 16px; line-height: 1.5;">
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">Solar Panels.</p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">Solar Inverter.</p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">ACDB & DCDB Box.</p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">Solar Panels Mounting Structure with structure accessories.</p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">AC & DC Cables.</p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">Earthing Kit with chemical bag.</p>
                </div>
                <div style="display: flex; align-items: center;">
                  <span>&#x27A2;&nbsp;</span>
                  <p style="margin: 0;">Lightning Arrestor (LA).</p>
                </div>
              </div>
            </div>
          </div>
        `,

        category: "Custom Blocks",
      });

      blockManager.add("full-container-Timeline", {
        label: "Project timeline",
        content: `
        <div 
        style="width: 210mm; height: 297mm; color: black; display: flex; flex-direction: column; gap: 24px; padding: 0 56px; justify-content: center;"
      >
        <div style="width: 100%; padding: 16px 0;">
          <h1 style="text-align: start; text-decoration: underline; color: #e63946; font-weight: bold; font-size: 24px;">Project Timeline</h1>
        </div>
        <div style="text-align: center; margin: 16px 0;">
          <img src="/timeline.png" alt="Project Timeline Diagram" style="width: 100%; height: 300px;" />
        </div>
        <div>
          <h2 style="text-decoration: underline; color: #e63946; font-weight: bold; font-size: 24px; margin-bottom: 8px;">Scope of Work</h2>
            <div style="margin: 0; color: #333; font-size: 16px; line-height: 1.5;">
              <div style="margin-bottom: 16px;">
                <div style="display: flex; align-items: center;">
                  <p style="margin: 0;"><strong>Our Scope:</strong></p>
                </div>
                <div style="">
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">1.&nbsp Online registration process & submission of documents in MGVCL.</p>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">2.&nbsp Collection of payments.</p>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">3.&nbsp Installation of Solar System.</p>
                  </div>
                </div>
              </div>
              <div style="margin-bottom: 16px;">
                <div style="display: flex; align-items: center;">
                  <p style="margin: 0;"><strong>Customer Scope:</strong></p>
                </div>
                <div style="">
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">1.&nbsp Any changes or updating in customer’s documents for solar system</p>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">2.&nbsp Providing safe storage place for material during Installation & Commissioning period.</p>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">3.&nbsp Providing appropriate space for structure & Earthing for solar system</p>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">4.&nbsp Approval of structure at the time of order and Solar system’s Insurance.</p>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">5.&nbsp Civil work (Foundation) of structure and Solar Cleaning regularly.</p>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">6.&nbsp Installation of ELCB / RCCB / MCB.</p>
                  </div>
                </div>
              </div>
              <div>
                <div style="display: flex; align-items: center;">
                  <p style="margin: 0;"><strong>MGVCL & MNRE Scope:</strong></p>
                </div>
                <div style="">
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">1.&nbsp 	Approval & clearance for installing solar system at customer’s place</p>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">2.&nbsp MGVCL Connection of Solar Meter after installation of solar system.</p>
                  </div>
                  <div style="display: flex; align-items: center;">
                    <p style="margin: 0;">3.&nbsp Subsidy amount deposited in customer’s bank account.</p>
                  </div>
                </div>
              </div>
            </div>

        </div>
      </div>
`      
        ,

        category: "Custom Blocks",
      });

      blockManager.add("full-container-TandC", {
        label: "Terms and Conditions",
        content: `
        <div
        style="width: 210mm; height: 297mm; color: black; display: flex; flex-direction: column; gap: 24px; padding: 0 56px; justify-content: start; margin-top:56px"
      >
        <div style="width: 100%; padding: 16px 0; margin-top: 20px;">
          <h1 style="text-align: start; text-decoration:underline; color: #e63946; font-weight: bold; font-size: 24px;">General Terms & Conditions</h1>
        </div>
        <div style="margin-bottom: 16px;">
         <div style="display: flex; flex-direction: column; gap: 5px;">
          <div>
            <p style="margin-top: 5px;">1.&nbsp; Site Work: Sometimes some customers force us to fulfill site work as per customer’s personal advice, guidelines, & thinking. At that time, in such cases, the customer is responsible for all matters in the present & future.</p>
          </div>
          <div>
            <p style="margin-top: 5px;">2.&nbsp; Project Time: Duration required for Installation of Solar System is subject to time required for Government and Discom clearance, Materials Availability, Pandemic, Weather Condition, etc.</p>
          </div>
          <div>
            <p style="margin-top: 5px;">3.&nbsp; Delivery of Materials: Within 15 Days after 100% full system amount is deposited in our bank account. All orders are subject to final confirmation & stock availability. (If one’s material is delivered at the customer’s site, then it’s not taken back by us under any conditions.)</p>
          </div>
          <div>
            <p style="margin-top: 5px;">4.&nbsp; Subsidy: Subsidy amount is directly deposited in the customer’s bank account by MNRE. If there is any query for subsidy, contact MGVCL directly as it’s deposited by MNRE and not in our control.</p>
          </div>
          <div>
            <p style="margin-top: 5px;">5.&nbsp; Damages: The company will not be responsible for any kind of mishandling, and we are not responsible for any damages caused by physical, accidental, or natural calamities like cyclones, pandemics, fires, earthquakes, tsunamis, etc.</p>
          </div>
          <div>
            <p style="margin-top: 5px;">6.&nbsp; Our Contact: Please visit our office or call our customer care numbers for further details/documents/requirements during office hours, i.e., 10 am to 5 pm, Monday to Saturday. (Office Closed - Sunday and Government Holidays)</p>
          </div>
          <div>
            <p style="margin-top: 5px;">7.&nbsp; General Terms: Every rule of the Government is paramount to us. Therefore, every new change made by the Government will be implemented from that same day. The new changes in Rules, Prices, and Other Things have to be accepted by all customers accordingly.</p>
          </div>
        </div>
      </div>
        `,

        category: "Custom Blocks",
      });

      blockManager.add("full-container-thankyou", {
        label: "Thank You",
        content: `
          <div style="width: 450px; height: 500px; margin-top: 60%; margin-left: 10%; display: flex; flex-direction: column; align-items: flex-start; justify-content: center;">
            <div>
              <h1 style="font-size: 40px; color: #e63946; font-weight: 600; margin-bottom: 2px;">
                Thank You!
              </h1>
            </div>
            <div style="margin-bottom: 2px;">
              <h2 style="font-size: 22px; font-weight: 600;">For Further Inquiries Connect with us at:</h2>
              <div style=" display: flex; align-items: start; margin-bottom: 0.5rem;">
                <p style="margin: 0; font-size: 16px;  font-weight: 600; text-decoration: underline;">Address:</p>&nbsp;<span class="CompanyAddress">Prabhu Kripa, Tilak Rd., Rajawadi, Ghatkoper (east) · Mumbai · Maharashtra, 400077</span>
              </div>

              <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                <p style="margin: 0; font-size: 16px;  font-weight: 600; text-decoration: underline;">CompanyPhone:</p>&nbsp; <span class="CompanyPhone">9964537294</span>
              </div>

              <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                <p style="margin: 0; font-size: 16px;  font-weight: 600; text-decoration: underline;">CompanyMail:</p>&nbsp; <span class="CompanyMail">lead2solar@gmail.com</span>
              </div>

              <div style=" display: flex; align-items: center; margin-bottom: 0.5rem;">
                <p style="margin: 0; font-size: 16px;  font-weight: 600; text-decoration: underline;">CompanyGST:</p>&nbsp; <span class="CompanyGST">GSTN2785GDJGUR6</span>
              </div>
            </div>
          </div>
        `,

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
