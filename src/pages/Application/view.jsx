import React, { useEffect, useState } from 'react';
import { useGetApplicationsQuery } from '../../generated/graphql.tsx';

const ApplicationView = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { data } = useGetApplicationsQuery();


  useEffect(() => {
    if (data) {
      setApplications(data.getApplications);
    }
  }, [data]);

  const filteredData = applications.filter(
    (item) =>
      item.appId.toLowerCase().includes(searchTerm.toLocaleLowerCase) ||
      item.aadhaar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col justify-center items-center text-left">
      <h1 className="text-2xl font-bold mb-4">View Applications</h1>
      <input
        type="text"
        placeholder="Search by Application ID, Aadhaar, Phone or Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded-lg w-[50vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex flex-col gap-8">
        {filteredData.length > 0 ? filteredData.map((item, index) => {
          const date = new Date(item.date)
          return (
          <div
            key={index}
            className="w-[50vw] border p-4  rounded-lg shadow-md bg-gray-100"
          >
            <p>
              <strong>ID:</strong> {item.appId}
            </p>
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
              <strong>Issue:</strong> {item.healthIssue}
            </p>
            <p>
              <strong>Remarks:</strong> {item.hospital}
            </p>
            <p>
              <strong>To:</strong> {item.to}
            </p>
            <p>
              <strong>From:</strong> {item.from}
            </p>
            <p>
              <strong>Subject:</strong> {item.subject}
            </p>
            <p>
              <strong>Date:</strong> {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
            </p>
            <p>
              <strong>Expected Expenditure:</strong> {item.expectedExpenditure}
            </p>
          </div>
        )
        }) :
          <h1>No Data Found!</h1>}
      </div>
    </div>
  );
};

export default ApplicationView;
