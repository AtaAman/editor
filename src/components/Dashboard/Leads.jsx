/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
const MESSAGE_TEMPLATES = {
  singleLead: (lead) => `
Hey Lead2Solar!

I'm ready to buy this lead:
*${lead["Lead Code"]}*

Quick details:
Size: ${lead["Project Size"].replace(",", ".")}
Type: ${lead["Nature of Installation"] || "N/A"}
Location: ${lead.City || "N/A"}, ${lead.State || "N/A"}
Post Code: ${lead["Post Code"] || "N/A"}

Ready to proceed! What's next?`,
  multipleLeads: (leadCodes) => `
Hey Lead2Solar!

I'm ready to purchase these ${leadCodes.length} leads:
${leadCodes.join("\n")}

Looking forward to moving ahead! What's the next step?`,
  requestLocation: (location) => `
Hey Lead2Solar!

I'm looking for leads ${location ? `in ${location}` : "my area"}
Could you notify me when leads become available in ${location ? `in ${location}` : "my area"}?

Thanks!`,
  subscriptionInquiry: () => `
Hey Lead2Solar!

I'm interested in your lead subscription plans
Could you share the available options and pricing details?

Thanks!`,
};

// interface Lead {
//   "Verified By": string;
//   "Lead Code": string;
//   City: string;
//   State: string;
//   "Post Code": string;
//   "Nature of Installation": string;
//   "Project Size": string;
// }

const WHATSAPP_CONFIG = {
  phoneNumber: "+919471665451",
  baseUrl: "https://wa.me",
};

// Utility Functions
const createWhatsAppUrl = (message) => {
  return `${WHATSAPP_CONFIG.baseUrl}/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
};

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    postCode: "",
    searchQuery: "",
  });
  const [loading, setLoading] = useState(true);
  const [selectedLeads, setSelectedLeads] = useState(new Set());
  const [isTableView, setIsTableView] = useState(false);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/getSheetData", {
          method: "get",
        });
        const data = await response.json();

        console.log(data);

        if (data?.data && Array.isArray(data.data)) {
          setLeads(data.data);
          setFilteredLeads(data.data);
        } else {
          console.error(
            "API response does not contain an array in 'data':",
            data
          );
          setLeads([]);
          setFilteredLeads([]);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        setLeads([]);
        setFilteredLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Apply filter after data is fetched
  useEffect(() => {
    const filtered = leads.filter((lead) => {
      const query = filters.searchQuery.toLowerCase();
      return (
        query === "" ||
        lead.City.toLowerCase().includes(query) ||
        lead.State.toLowerCase().includes(query) ||
        lead["Post Code"].toLowerCase().includes(query)
      );
    });
    setFilteredLeads(filtered);
  }, [filters.searchQuery, leads]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (leadCode) => {
    setSelectedLeads((prev) => {
      const updatedSelection = new Set(prev);
      if (updatedSelection.has(leadCode)) {
        updatedSelection.delete(leadCode);
      } else {
        updatedSelection.add(leadCode);
      }
      return updatedSelection;
    });
  };

  const handleContactClick = () => {
    if (selectedLeads.size === 0) return;

    const selectedLeadMessages = Array.from(selectedLeads).map((leadCode) => {
      const lead = leads.find((lead) => lead["Lead Code"] === leadCode);
      return lead ? MESSAGE_TEMPLATES.singleLead(lead) : "";
    });

    const message =
      selectedLeads.size === 1
        ? selectedLeadMessages[0]
        : MESSAGE_TEMPLATES.multipleLeads(Array.from(selectedLeads));

    window.open(createWhatsAppUrl(message), "_blank");
  };

  const handleRequestLocationClick = () => {
    const location = prompt("Enter your location:");
    const message = MESSAGE_TEMPLATES.requestLocation(location);
    window.open(createWhatsAppUrl(message), "_blank");
  };

  const handleSubscriptionInquiryClick = () => {
    const message = MESSAGE_TEMPLATES.subscriptionInquiry();
    window.open(createWhatsAppUrl(message), "_blank");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-6xl pt-4 px-2">
        <div className="flex justify-center items-center my-6">
          <button
            onClick={handleSubscriptionInquiryClick}
            className="bg-[#ffffff] flex gap-2 text-sm text-secondary px-6 py-3 rounded-lg shadow hover:bg-primary transition duration-300"
          >
            <WhatsAppIcon />
            Ask for Subscription
          </button>
        </div>

        {/* Filters and Select All Option */}
        <div className="sticky top-4  rounded-md z-10 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="w-full sm:flex-1">
              <input
                type="text"
                id="searchQuery"
                name="searchQuery"
                placeholder="Search by City, State, or Post Code"
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters({ ...filters, searchQuery: e.target.value })
                }
                className="w-full border bg-[#fff]/80 rounded-md backdrop-blur-lg border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* No Leads Available */}
            {filteredLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  No leads available at this location.
                </p>
                <p className="text-gray-600 mb-4">
                  DM us for specific location.
                </p>
                <button
                  onClick={handleRequestLocationClick}
                  className="bg-[#fff] text-sm text-secondary px-6 py-3 rounded-lg shadow hover:bg-[#f8ebeb] transition duration-300"
                >
                  Ask for Specific Location
                </button>
              </div>
            ) : (
              <>
                {/* Scrollable Cards */}
                <div className="flex my-8 flex-col items-center min-h-screen overflow-x-hidden">
                  <div className="w-full max-w-6xl pt-4">
                    {/* View Switch Button and Select All */}
                    <div className="flex justify-between items-center mb-4 px-4">
                      {/* View Switch Button */}
                      <button
                        onClick={() => setIsTableView(!isTableView)}
                        className="bg-primary text-white px-4 py-2 rounded-md shadow hover:bg-secondary transition duration-300"
                      >
                        Switch to {isTableView ? "List View" : "Table View"}
                      </button>

                      {/* Select All */}
                      <label className="flex items-center text-green-950 cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLeads(
                                new Set(
                                  filteredLeads.map((lead) => lead["Lead Code"])
                                )
                              );
                            } else {
                              setSelectedLeads(new Set());
                            }
                          }}
                          checked={filteredLeads.every((lead) =>
                            selectedLeads.has(lead["Lead Code"])
                          )}
                          className="mr-2 h-5 w-5 rounded-2xl focus:ring-green-600"
                        />
                        Select All
                      </label>
                    </div>

                    {/* Remaining content */}
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <>
                        {filteredLeads.length === 0 ? (
                          <div className="text-center py-10">
                            <p className="text-xl font-semibold text-gray-800 mb-4">
                              No leads available at this location.
                            </p>
                          </div>
                        ) : isTableView ? (
                          // Table View
                          <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-200">
                              <thead>
                                <tr className="bg-gray-100 text-left">
                                  <th className="border border-gray-200 p-2">
                                    Select
                                  </th>
                                  <th className="border border-gray-200 p-2">
                                    Lead Code
                                  </th>
                                  <th className="border border-gray-200 p-2">
                                    Nature of Installation
                                  </th>
                                  <th className="border border-gray-200 p-2">
                                    City
                                  </th>
                                  <th className="border border-gray-200 p-2">
                                    State
                                  </th>
                                  <th className="border border-gray-200 p-2">
                                    Post Code
                                  </th>
                                  <th className="border border-gray-200 p-2">
                                    Project Size
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {filteredLeads.map((lead, idx) => (
                                  <tr key={idx}>
                                    <td className="border border-gray-200 p-2 text-center">
                                      <input
                                        type="checkbox"
                                        checked={selectedLeads.has(
                                          lead["Lead Code"]
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(
                                            lead["Lead Code"]
                                          )
                                        }
                                        className="cursor-pointer rounded-2xl"
                                      />
                                    </td>
                                    <td className="border border-gray-200 p-2">
                                      {lead["Lead Code"]}
                                    </td>
                                    <td className="border border-gray-200 p-2">
                                    {lead["Nature of Installation"]}
                                    </td>
                                    <td className="border border-gray-200 p-2">
                                      {lead.City}
                                    </td>
                                    <td className="border border-gray-200 p-2">
                                      {lead.State}
                                    </td>
                                    <td className="border border-gray-200 p-2">
                                      {lead["Post Code"]}
                                    </td>
                                    <td className="border border-gray-200 p-2">
                                      {lead["Project Size"]}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          // List View
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4">
                            {filteredLeads.map((lead, idx) => (
                              <div
                                key={idx}
                                className="bg-base border border-[#fefae0] rounded-2xl h-[250px] shadow-md p-6 flex flex-col justify-between"
                              >
                                <div className="flex items-center justify-between mb-6">
                                  <h2 className="text-2xl font-semibold text-green-950 bg-[#ffffff] px-3 py-1 rounded-md truncate">
                                    {lead["Project Size"]} Project
                                  </h2>
                                  <input
                                    type="checkbox"
                                    checked={selectedLeads.has(
                                      lead["Lead Code"]
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(lead["Lead Code"])
                                    }
                                    className="cursor-pointer rounded-2xl"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <p className="text-green-950 bg-green-100 text-center py-4 rounded-md text-md">
                                    {lead["Lead Code"]}
                                  </p>
                                  <p className="text-green-950 bg-green-100 text-center py-4 rounded-md text-md">
                                    {lead["Post Code"]}
                                  </p>
                                  <p className="text-green-950 bg-green-100 text-center py-4 rounded-md text-md">
                                    {lead["Nature of Installation"]}
                                  </p>
                                  <p className="text-green-950 bg-green-100 text-center py-4 rounded-md text-md">
                                    {lead.City}
                                  </p>
                                  <p className="text-green-950 bg-green-100 text-center py-4 rounded-md text-md">
                                    {lead.State}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Fixed Contact Button */}
            {selectedLeads.size > 0 && (
              <div className="fixed bottom-2 bg-black/20  backdrop-blur-md left-1/2 transform -translate-x-1/2 w-full rounded-2xl max-w-md shadow-lg p-4 flex justify-between items-center">
                <span className="text-white font-medium">
                  {selectedLeads.size} lead(s) selected
                </span>
                <div className="flex space-x-4">
                  <button
                    onClick={handleContactClick}
                    className="bg-white text-gray-600 flex items-center gap-2 px-6 py-2 rounded-lg shadow transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selectedLeads.size === 0}
                  >
                    <WhatsAppIcon />
                    Get leads
                  </button>
                  <button
                    onClick={() => setSelectedLeads(new Set())}
                    className="text-gray-600 bg-white px-4 py-2 rounded-lg transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Leads;

const WhatsAppIcon = () => (
  <svg
    width={20}
    height={20}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="#25D366"
      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
    />
  </svg>
);
