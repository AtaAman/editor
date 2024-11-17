/* eslint-disable no-unused-vars */

import React from "react";
import { motion } from "framer-motion";

function Estimate() {
  return (
    <motion.section
      className="py-10 text-secondary sm:py-20 px-5 sm:px-10 md:px-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-xl md:text-3xl text-center pb-5 sm:pb-10 sm:pl-10 font-extrabold">
        See Your Potential Savings
      </h2>
      <div
        id="estimate"
        className="max-w-3xl bg-opacity-70 mx-auto p-10 sm:px-10 py-10 sm:py-20 rounded rounded-xl shadow-2xl shadow-primary/40"
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-0 md:gap-5">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="state">
              Select Your State
            </label>
            <select
              id="state"
              className="w-full p-3 border border-primary rounded-md focus:ring-2 focus:ring-secondary/50"
            >
              <option value="">Select Your State</option>
              {/* Add all state options here */}
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Delhi">Delhi</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="customerType"
            >
              Select Customer Type
            </label>
            <select
              id="customerType"
              className="w-full p-3 border border-primary rounded-md focus:ring-2 focus:ring-secondary/50"
            >
              <option value="">Select Customer Type</option>
              <option value="Residential">Residential</option>
              <option value="Institutional">Institutional</option>
              <option value="Social Sector">Social Sector</option>
              <option value="Government">Government</option>
              <option value="Industrial">Industrial</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium "
              htmlFor="monthlyBill"
            >
              Enter Your Average Monthly Electricity Bill (₹)
            </label>
            <input
              id="monthlyBill"
              type="number"
              className="w-full p-3 border border-primary rounded-md focus:ring-2 focus:ring-secondary/50"
              placeholder="Enter amount in ₹"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="pincode">
              Pincode
            </label>
            <input
              id="pincode"
              type="text"
              className="w-full p-3 border border-primary rounded-md focus:ring-2 focus:ring-secondary/50"
              placeholder="Enter your pincode"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full p-3 border border-primary rounded-md focus:ring-2 focus:ring-secondary/50"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="name">
              Customer Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border border-primary rounded-md focus:ring-2 focus:ring-secondary/50"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-primary rounded-md focus:ring-2 focus:ring-secondary/50"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <button className="w-full bg-secondary text-white p-3 rounded-md hover:bg-secondary/70 transition mt-4">
          Calculate Savings
        </button>
      </div>
    </motion.section>
  );
}

export default Estimate;
