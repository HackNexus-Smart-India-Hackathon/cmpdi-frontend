import { jsPDF } from 'jspdf';
import React from 'react';

const PDFGenerate = () => {
  const generatePDF = () => {
    const jsonData = {
      name: 'Jane Doe',
      age: 25,
      profession: 'Designer',
    };

    const doc = new jsPDF();
    doc.text('JSON Data to PDF', 10, 10);

    let y = 20;
    Object.keys(jsonData).forEach((key) => {
      doc.text(`${key}: ${jsonData[key]}`, 10, y);
      y += 10;
    });

    doc.save('data.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PDFGenerate;
