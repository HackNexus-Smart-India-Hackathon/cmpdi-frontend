import jsPDF from 'jspdf';
import React from 'react';

import 'jspdf-autotable';

const FormTwoPDF = () => {
  const tableData = [
    {
      item: 'Land & Building',
      approvedCost: '',
      received: '',
      interest: '',
      incurred: '',
      balance: '',
      provision: '',
      required: '',
    },
    {
      item: 'Capital Equipment',
      approvedCost: '',
      received: '',
      interest: '',
      incurred: '',
      balance: '',
      provision: '',
      required: '',
    },
    {
      item: 'Manpower',
      approvedCost: '',
      received: '',
      interest: '',
      incurred: '',
      balance: '',
      provision: '',
      required: '',
    },
    {
      item: 'Consumables',
      approvedCost: '',
      received: '',
      interest: '',
      incurred: '',
      balance: '',
      provision: '',
      required: '',
    },
    {
      item: 'Travel',
      approvedCost: '',
      received: '',
      interest: '',
      incurred: '',
      balance: '',
      provision: '',
      required: '',
    },
    {
      item: 'Contingencies',
      approvedCost: '',
      received: '',
      interest: '',
      incurred: '',
      balance: '',
      provision: '',
      required: '',
    },
    {
      item: 'Workshops/Seminars',
      approvedCost: '',
      received: '',
      interest: '',
      incurred: '',
      balance: '',
      provision: '',
      required: '',
    },
  ];

  const handleGeneratePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(14);
    doc.text('Fund Requisition Form - FORM-II', pageWidth / 2, 10, {
      align: 'center',
    });

    // Add Project Details
    const detailsStartY = 20;
    doc.setFontSize(12);
    doc.text(
      'Name of the Project: ___________________________________',
      10,
      detailsStartY
    );
    doc.text(
      'Project Code: __________________________________________',
      10,
      detailsStartY + 10
    );
    doc.text(
      'Name of the Company/Institution: _______________________',
      10,
      detailsStartY + 20
    );
    doc.text(
      'Statement Period/Year: ________________________________',
      10,
      detailsStartY + 30
    );

    // Add Table
    const tableStartY = detailsStartY + 40;
    doc.autoTable({
      startY: tableStartY,
      head: [
        [
          'Item',
          'Total Approved Cost',
          'Total Fund Received',
          'Interest Earned',
          'Expenditure Incurred',
          'Balance Available',
          'Fund Provision',
          'Fund Required',
        ],
      ],
      body: tableData.map((row) => [
        row.item,
        row.approvedCost,
        row.received,
        row.interest,
        row.incurred,
        row.balance,
        row.provision,
        row.required,
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [220, 220, 220],
        textColor: 0,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 40 }, // Item
        1: { cellWidth: 30 }, // Approved Cost
        2: { cellWidth: 30 }, // Fund Received
        3: { cellWidth: 30 }, // Interest Earned
        4: { cellWidth: 30 }, // Expenditure
        5: { cellWidth: 30 }, // Balance
        6: { cellWidth: 30 }, // Provision
        7: { cellWidth: 30 }, // Required
      },
    });

    // Signature Section
    const signatureStartY = doc.lastAutoTable.finalY + 20;
    doc.text(
      'Signature of Associate Finance Officer: ___________________',
      10,
      signatureStartY
    );
    doc.text(
      'Signature of Project Leader/Coordinator: _________________',
      10,
      signatureStartY + 10
    );

    // Save the PDF
    doc.save('Form-II-Fund-Requisition.pdf');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleGeneratePDF}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default FormTwoPDF;
