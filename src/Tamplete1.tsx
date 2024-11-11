const getBlockContent = (
  referenceNo: string,
  date: string,
  projectSize: string,
  customerName: string,
  customerPhone: string,
  customerAddress: string,
  companyPoc: string,
  companyName: string,
  companyPhone: string,
  companyAddress: string,
  imageUrl: string
) => {
  const defaultReferenceNo = referenceNo || "Reference Number";
  const defaultDate = date || "10-11-2024";
  const defaultProjectSize = projectSize || "10kW";
  const defaultCustomerName = customerName || "John Doe";
  const defaultCustomerPhone = customerPhone || "1234567890";
  const defaultCustomerAddress = customerAddress || "Mumbai, Maharashtra";
  const defaultCompanyPoc = companyPoc || "John";
  const defaultCompanyPhone = companyPhone || "1234567890";
  const defaultCompanyName = companyName || "Lead2Solar";
  const defaultCompanyAddress = companyAddress || "Navi Mumbai";
  const defaultImageUrl = imageUrl || "https://via.placeholder.com/150";

  return `
    <div class="flex flex-col justify-center items-center bg-gray-200">
      <div
        class="relative w-[210mm] h-[297mm] flex justify-start"
        style="background-image: url('/bg.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"
      >
        <div class="absolute top-20 right-8">
          <img src="/logo.png" alt="Logo" height="280" width="250" />
        </div>

        <div class="absolute top-[45%] left-10 p-10">
          <div class="text-gray-800 space-y-2">
            <p>Ref No: ${defaultReferenceNo}</p>
            <p>Date: ${defaultDate}</p>
            <p class="text-3xl text-red-600 font-bold">${defaultProjectSize}</p>
            <h1 class="text-3xl text-red-600 font-bold mb-4">Solar Proposal</h1>

            <h2 class="text-md font-semibold">Prepared For:</h2>
            <p>${defaultCustomerName},</p>
            <p>${defaultCustomerPhone},</p>
            <p>${defaultCustomerAddress}.</p>

            <h2 class="text-md font-semibold mt-6">Prepared By:</h2>
            <p>${defaultCompanyPoc},</p>
            <p>${defaultCompanyName},</p>
            <p>${defaultCompanyPhone},</p>
            <p>${defaultCompanyAddress}.</p>
          </div>
        </div>
      </div>

      <div
        class="w-[210mm] h-[297mm] text-black flex flex-col gap-6 px-14 justify-center"
        style="background-image: url('/bg1.png'); background-size: cover; background-position: top; background-repeat: no-repeat;"
      >
        <div class="w-full py-4">
          <h1 class="text-center text-red-600  font-bold text-3xl" >Welcome</h1>
        </div>

        <div class="flex w-full flex-row justify-between">
          <p>Ref No: ${defaultReferenceNo}</p>
          <p>Date: ${defaultDate}</p>
        </div>


         <div class="flex flex-col justify-between">
          <p>To,</p>
          <p>${defaultCustomerName},</p>
          <p>${defaultCustomerAddress}.</p>
        </div>

        <div class="flex flex-col justify-between">
          <p>Sub: Proposal for Supply & Installation of <span>${defaultProjectSize}</span> Grid Connected Solar PV
          Power Plant.</p>
        </div>

        
        
        <div>
        <p>With reference to above said subject, we are very much thankful to you for showing your
        interest in our service. Based on the information provide by you, we are pleased to quote our
        offer for supply & Installation of Grid Connected Solar PV Power Plant</p>
        </div>

        <div>
        <p>Inter-connected with the electric utility grid or the meters, these systems are also called
        ‘GridTie Systems’. The DC power is converted into AC power by an inverter. These systems
        allow users to mobilize the energy provided by the Sun and feed the left overs to the grid
        which helps in cutting down costs. During the evening or in the absence of sunlight, power
        can be drawn from the grid, thus eliminating the need for battery banks.</p>
        </div>


        <div>
        <p class="font-bold">The benifits include:</p>
        <div class="p-5 mt-2">
          <p><span>&#8711  </span> Limitless power supply which is free of cost.</p>
          <p><span>&#8711  </span> Net metering in ‘Grid-Tie Systems’ helps in calculating exported surplus power to the
              grid which contributes to a reduction in your electricity bill.</p>
          <p><span>&#8711  </span>It is easy to maintain and low on operation investments.</p>
        </div>
        </div>


        <div>
          <p>Thanks & Regards,</p>
        </div>


        <div>
          <p>${defaultCompanyPoc},</p>
          <p>${defaultCompanyName},</p>
          <p>${defaultCompanyPhone},</p>
        </div>
      </div>

      <div
        class="w-[210mm] h-[297mm] text-black flex flex-col gap-6 px-14 justify-center"
        style="background-image: url('/bg1.png'); background-size: cover; background-position: top; background-repeat: no-repeat;"
      >
        <div class="">
          <h1 class="text-start text-red-600  font-bold text-xl" >Expected Monthly Generation & Savings</h1>
        </div>


  <div class="overflow-x-auto max-w-2xl mx-auto ">
  <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
    <thead>
      <tr>
        <th class="px-3 py-2 text-left font-medium text-gray-700 border-b bg-gray-100">Month</th>
        <th class="px-3 py-2 text-left font-medium text-gray-700 border-b bg-gray-100">Before Solar (kWh)</th>
        <th class="px-3 py-2 text-left font-medium text-gray-700 border-b bg-gray-100">After Solar (kWh)</th>
      </tr>
    </thead>
    <tbody class="text-gray-600">
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">January</td>
        <td class="px-6 py-1 border-b">120</td>
        <td class="px-6 py-1 border-b">60</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">February</td>
        <td class="px-6 py-1 border-b">110</td>
        <td class="px-6 py-1 border-b">55</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">March</td>
        <td class="px-6 py-1 border-b">130</td>
        <td class="px-6 py-1 border-b">65</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">April</td>
        <td class="px-6 py-1 border-b">125</td>
        <td class="px-6 py-1 border-b">62</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">May</td>
        <td class="px-6 py-1 border-b">140</td>
        <td class="px-6 py-1 border-b">70</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">June</td>
        <td class="px-6 py-1 border-b">150</td>
        <td class="px-6 py-1 border-b">75</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">July</td>
        <td class="px-6 py-1 border-b">160</td>
        <td class="px-6 py-1 border-b">80</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">August</td>
        <td class="px-6 py-1 border-b">155</td>
        <td class="px-6 py-1 border-b">77</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">September</td>
        <td class="px-6 py-1 border-b">145</td>
        <td class="px-6 py-1 border-b">72</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">October</td>
        <td class="px-6 py-1 border-b">135</td>
        <td class="px-6 py-1 border-b">68</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">November</td>
        <td class="px-6 py-1 border-b">125</td>
        <td class="px-6 py-1 border-b">62</td>
      </tr>
      <tr class="odd:bg-gray-50">
        <td class="px-6 py-1 border-b">December</td>
        <td class="px-6 py-1 border-b">115</td>
        <td class="px-6 py-1 border-b">58</td>
      </tr>
    </tbody>
  </table>
</div>


        <div class="mb-6">
          <img src="${defaultImageUrl}" alt="Image" class="w-full h-auto rounded-md" />
        </div>


        
      </div>

      <div
        class="relative w-[210mm] h-[297mm] flex justify-start"
        style="background-image: url('/bg.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"
      >
        <div class="absolute top-20 right-8">
          <img src="/logo.png" alt="Logo" height="280" width="250" />
        </div>

        <div class="absolute top-[50%] left-10 p-10">
          <div class="text-gray-800 space-y-2">

            <p class="text-4xl text-red-600 font-bold">Thank You!</p>

            <p class="text-lg mb-4">For Further Inquiries Connect with us at:</p>

            <div>
            <p>Company POC : ${defaultCompanyPoc},</p>
            <p>Company Name : ${defaultCompanyName},</p>
            <p>Company Phone : ${defaultCompanyPhone},</p>
            <p>Company Address : ${defaultCompanyAddress}.</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  `;
};

export default getBlockContent;
