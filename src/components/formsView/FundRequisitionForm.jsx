import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ExportFundDataToExcel = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/forms/fund-requisition/form/8'
        );
        setData(response.data.data); // Assuming the response has the required data in `data`
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    if (!data) return;

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add summary sheet
    const summaryData = [
      ['Project ID', data.projectId],
      ['Year Period', data.yearPeriod],
      ['Created At', data.createdAt],
      ['Updated At', data.updatedAt],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Add funds details sheet
    const fundsHeader = [
      'Category',
      'Provision',
      'Expenditure',
      'Fund Received',
      'Fund Required',
      'Interest Earned',
      'Total Approved Cost',
    ];
    const fundsData = Object.entries(data.funds).map(([category, details]) => [
      category,
      details.provision || '',
      details.expenditure || '',
      details.fundReceived || '',
      details.fundRequired || '',
      details.interestEarned || '',
      details.totalApprovedCost || '',
    ]);
    const fundsSheet = XLSX.utils.aoa_to_sheet([fundsHeader, ...fundsData]);
    XLSX.utils.book_append_sheet(workbook, fundsSheet, 'Funds Details');

    // Export the workbook
    XLSX.writeFile(workbook, 'Fund_Requisition_Details.xlsx');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Fund Requisition Report</h1>
      <button onClick={handleExport}>Download Excel</button>
    </div>
  );
};

export default ExportFundDataToExcel;
