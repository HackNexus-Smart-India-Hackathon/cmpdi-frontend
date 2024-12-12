import React from 'react';

const Disbursement = ({ data }) => {
  console.log(data);

  return (
    <div className="w-[80vw] mx-auto p-6 bg-white shadow-md border rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Disbursement of Funds</h1>
      <table className="min-w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3">Date</th>
            <th className="border border-gray-300 p-3">Funds Allocated</th>
            <th className="border border-gray-300 p-3">TDS (10%)</th>
            <th className="border border-gray-300 p-3">Others</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((row) => (
              <tr key={row.id}>
                <td className="border border-gray-300 p-3">
                  {row.createdAt.slice(0, 10)}
                </td>
                <td className="border border-gray-300 p-3">
                  {row.totalFundsReceived}
                </td>
                <td className="border border-gray-300 p-3">
                  {row.totalFundsReceived * 0.1}
                </td>
                <td className="border border-gray-300 p-3">10000</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Disbursement;
