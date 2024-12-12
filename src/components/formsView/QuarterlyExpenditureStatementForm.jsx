import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PROJECT_BASE_API}/api/forms/quarterly-expenditure-statement/form/${id}`
        );
        setData(response.data.data); // Assuming the response has the required data in `data`
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleExport = () => {
    if (!data) return;

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add summary sheet
    const summaryData = [
      ['Project ID', data.projectId],
      ['Quarter Ending', data.quarterEnding],
      ['Expenditure To Date', data.expenditureToDate],
      ['Funds Advanced', data.fundsAdvanced],
      ['Unspent Balance', data.unspentBalance],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Add financial details sheet
    const financialDetailsHeader = [
      'Category',
      'Current Quarter',
      'Previous Quarter',
      'Previous Year',
      'Sanctioned Provision',
      'Total Approved',
    ];
    const financialDetailsData = data.financialDetails.map((item) => [
      item.category,
      item.currentQuarter,
      item.previousQuarter,
      item.previousYear,
      item.sanctionedProvision,
      item.totalApproved,
    ]);
    const financialDetailsSheet = XLSX.utils.aoa_to_sheet([
      financialDetailsHeader,
      ...financialDetailsData,
    ]);
    XLSX.utils.book_append_sheet(
      workbook,
      financialDetailsSheet,
      'Financial Details'
    );

    // Export the workbook
    XLSX.writeFile(workbook, 'Project_Details.xlsx');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Project Report</h1>
      <button onClick={handleExport}>Download Excel</button>
    </div>
  );
};

export default ExportToExcel;
