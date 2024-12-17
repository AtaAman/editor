'use client'

import { useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProposalChart = () => {
  const chartRef = useRef(null);
  const [tableData, setTableData] = useState([
    { label: 'January', beforeSolar: 120, afterSolar: 60 },
    { label: 'February', beforeSolar: 110, afterSolar: 55 },
    { label: 'March', beforeSolar: 130, afterSolar: 65 },
    { label: 'April', beforeSolar: 125, afterSolar: 62 },
    { label: 'May', beforeSolar: 140, afterSolar: 70 },
    { label: 'June', beforeSolar: 150, afterSolar: 75 },
    { label: 'July', beforeSolar: 160, afterSolar: 80 },
    { label: 'August', beforeSolar: 155, afterSolar: 77 },
    { label: 'September', beforeSolar: 145, afterSolar: 72 },
    { label: 'October', beforeSolar: 135, afterSolar: 68 },
    { label: 'November', beforeSolar: 125, afterSolar: 62 },
    { label: 'December', beforeSolar: 115, afterSolar: 58 },
  ]);
  const [refreshChart, setRefreshChart] = useState(false);

  const handleTableChange = (index, field, newValue) => {
    const updatedData = [...tableData];
    updatedData[index][field] = parseFloat(newValue) || 0;
    setTableData(updatedData);
  };

  const generateChartImage = async (event) => {
    event.preventDefault();

    if (chartRef.current) {
      const chartInstance = chartRef.current;
      const image = chartInstance.toBase64Image();

      const response = await fetch('https://l2sbackend.onrender.com/api/upload-chart-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      });

      if (response.ok) {
        console.log('Image saved successfully on the server.');
      } else {
        console.error('Failed to save image on the server.');
      }

      setRefreshChart((prev) => !prev);
    } else {
      console.error('Chart reference is not set');
    }
  };

  const chartLabels = tableData.map((row) => row.label);
  const beforeSolarValues = tableData.map((row) => row.beforeSolar);
  const afterSolarValues = tableData.map((row) => row.afterSolar);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Before Solar',
        data: beforeSolarValues,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'After Solar',
        data: afterSolarValues,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Electricity Bill Comparison: Before and After Solar',
      },
    },
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto my-12 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-black text-center">Electricity Bill Comparison Chart</h1>
        <table className="w-full mb-6 text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b font-medium">Month</th>
              <th className="border-b font-medium">Before Solar ($)</th>
              <th className="border-b font-medium">After Solar ($)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="odd:bg-gray-100">
                <td className="">
                  <input
                    type="text"
                    value={row.label}
                    onChange={(e) => handleTableChange(index, 'label', e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="">
                  <input
                    type="number"
                    value={row.beforeSolar}
                    onChange={(e) => handleTableChange(index, 'beforeSolar', e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
                <td className="">
                  <input
                    type="number"
                    value={row.afterSolar}
                    onChange={(e) => handleTableChange(index, 'afterSolar', e.target.value)}
                    className="w-full p-1 border rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-4">
          <Bar ref={chartRef} key={refreshChart ? 'chart1' : 'chart2'} data={data} options={options} />
        </div>
        <button
          onClick={generateChartImage}
          type="button"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Chart as Image
        </button>
      </div>
    </div>
  );
};

export default ProposalChart;