import React from "react";

function DemoTemplate() {
  return (
    <div>
      <div className="flex flex-col h-[297mm] justify-center items-center bg-gray-200">
        <div
          className="relative w-[210mm] h-[297mm] flex justify-start"
          style={{
            backgroundImage: "url('/bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Logo in the top-right corner */}
          <div className="absolute top-20 right-8">
            <img src="/logo.png" alt="Logo" height={280} width={250} />
          </div>

          {/* Centered text content */}
          <div className="absolute top-[45%] left-10 p-10">
            <div className="text-gray-800 space-y-2">
              <p>Ref No: «Reference No.»</p>
              <p>Date: «Date»</p>
              <p className="text-3xl text-red-600 font-semibold">
                «Project Size (kW)»
              </p>
              <h1 className="text-3xl text-red-600  font-semibold mb-4">
                Solar Proposal
              </h1>

              <h2 className="text-md font-semibold">Prepared For:</h2>
              <p>«Customer Name»,</p>
              <p>«Customer Phone»,</p>
              <p>«Customer Address».</p>

              <h2 className="text-md font-semibold mt-6">Prepared By:</h2>
              <p>«Company POC»,</p>
              <p>«Company Name»,</p>
              <p>«Company Phone»,</p>
              <p>«Company Address».</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-[297mm] justify-between items-center bg-gray-200">
        {/* Header with background image */}
        <div
          className="w-[210mm] h-[50mm] bg-white bg-no-repeat"
          style={{
            backgroundImage: "url('/header.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "top",
          }}
        />

        <div className="flex w-[210mm] h-full flex-col py-8 bg-white">
          {/* Header Section */}
          <h1 className="text-3xl font-semibold text-red-600 text-center">
            Welcome
          </h1>

          {/* Main Content */}
          <div className="space-y-6 w-[210mm] px-10">
            <p className="text-sm text-gray-800">
              To, <br />
              <strong>«Customer Name»</strong>, <br />
              «Customer Address». <br />
              «Reference No.» <br />
              «Date»
            </p>

            <h2 className="text-md font-semibold text-red-600">
              Sub: Proposal for Supply & Installation of «Project Size (kW)»
              Grid Connected Solar PV Power Plant.
            </h2>

            <p className="text-sm text-gray-800">
              With reference to the above-mentioned subject, we are very much
              thankful to you for showing your interest in our service. Based on
              the information provided by you, we are pleased to quote our offer
              for the supply & installation of the Grid Connected Solar PV Power
              Plant.
            </p>

            <p className="text-sm text-gray-800">
              Inter-connected with the electric utility grid or the meters,
              these systems are also called ‘Grid-Tie Systems’. The DC power is
              converted into AC power by an inverter. These systems allow users
              to mobilize the energy provided by the Sun and feed the leftovers
              to the grid, which helps in cutting down costs. During the evening
              or in the absence of sunlight, power can be drawn from the grid,
              thus eliminating the need for battery banks.
            </p>

            <p className="text-sm text-gray-800">The benefits include:</p>

            <ul className="list-disc pl-5 space-y-2 text-md text-gray-800">
              <li>Limitless power supply which is free of cost.</li>
              <li>
                Net metering in ‘Grid-Tie Systems’ helps in calculating exported
                surplus power to the grid, which contributes to a reduction in
                your electricity bill.
              </li>
              <li>It is easy to maintain and low on operation investments.</li>
            </ul>

            <p className="text-sm text-gray-800 mt-6">
              Thanks & Regards, <br />
              <strong>«Company POC»</strong> <br />
              <strong>«Company Phone»</strong> <br />
              <strong>«Company Name»</strong>
            </p>
          </div>
        </div>

        {/* Footer with background image */}
        <div
          className="w-[210mm] h-[50mm] bg-white bg-no-repeat"
          style={{
            backgroundImage: "url('/footer.png')",
            backgroundSize: "contain",
            backgroundPosition: "bottom",
          }}
        />
      </div>

      <div className="flex flex-col h-[297mm] justify-between items-center bg-gray-200">
        {/* Header with background image */}
        <div
          className="w-[210mm] h-[50mm] bg-white bg-no-repeat"
          style={{
            backgroundImage: "url('/header.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "top",
          }}
        />
        
        <div className="flex-1 w-[210mm] h-full bg-white">
          <img src="/logo.png" alt="Image" className="w-full h-auto rounded-md" />
        </div>

        {/* Footer with background image */}
        <div
          className="w-[210mm] h-[50mm] bg-white bg-no-repeat"
          style={{
            backgroundImage: "url('/footer.png')",
            backgroundSize: "contain",
            backgroundPosition: "bottom",
          }}
        />
      </div>
    </div>
  );
}

export default DemoTemplate;
