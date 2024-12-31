import React, { useEffect, useState } from 'react';
import { useGetCmnrfApplicationsQuery } from '../../generated/graphql.tsx';

const Viewcmnrf = () => {
  const [CMNRFData, setCMNRFData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useGetCmnrfApplicationsQuery();

  useEffect(() => {
    if (data) {
      setCMNRFData(data.getCMNRFApplications);
    }
  }, [data]);

  const filteredData = CMNRFData.filter(
    (item) =>
      item.aadhaar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col justify-center items-center text-left">
      <h1 className="text-2xl font-bold mb-4">CMNRF Applications</h1>
      <input
        type="text"
        placeholder="Search by Aadhaar, Phone or Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded-lg w-[50vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-col gap-8">
        {filteredData.length > 0 ? filteredData.map((item, index) => (
          <div
            key={index}
            className="w-[50vw] border p-4  rounded-lg shadow-md bg-gray-100"
          >
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Aadhaar:</strong> {item.aadhaar}
            </p>
            <p>
              <strong>Phone:</strong> {item.phone}
            </p>
            <p>
              <strong>Address:</strong> {item.address}
            </p>
            <p>
              <strong>Health Issue:</strong> {item.healthIssue}
            </p>
            <p>
              <strong>Hospital:</strong> {item.hospital}
            </p>
            <p>
              <strong>Expected Expenditure:</strong> {item.expectedExpenditure}
            </p>
          </div>
        )) :
          <h1>No Data Found!</h1>}
      </div>
    </div>
  );
};

export default Viewcmnrf;
