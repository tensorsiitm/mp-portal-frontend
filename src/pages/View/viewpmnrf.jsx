import React, { useEffect, useState } from 'react';
import { useGetPmnrfApplicationsQuery } from '../../generated/graphql.tsx';

// const data = [
//   {
//     name: 'John Doe',
//     adhaar: '1234-5678-9012',
//     phone: '+91-9876543210',
//     address: '123 Elm Street, Chennai, Tamil Nadu',
//     healthIssue: 'Cardiac Arrest',
//     hospital: 'Apollo Hospitals',
//     expectedExpenditure: '₹5,00,000',
//   },
//   {
//     name: 'Jane Smith',
//     adhaar: '2345-6789-0123',
//     phone: '+91-8765432109',
//     address: '456 Oak Avenue, Mumbai, Maharashtra',
//     healthIssue: 'Fractured Leg',
//     hospital: 'Lilavati Hospital',
//     expectedExpenditure: '₹1,50,000',
//   },
//   {
//     name: 'Rajesh Kumar',
//     adhaar: '3456-7890-1234',
//     phone: '+91-7654321098',
//     address: '789 Pine Lane, Delhi',
//     healthIssue: 'Kidney Failure',
//     hospital: 'AIIMS',
//     expectedExpenditure: '₹8,00,000',
//   },
// ];



const Viewpmnrf = () => {
  const [PMNRFData, setPMNRFData] = useState([]);
  const { data } = useGetPmnrfApplicationsQuery();

  useEffect(() => {
    if (data) {
      setPMNRFData(data.getPMNRFApplications);
    }
  }, [data]);

  return (
    <div className="p-4 flex flex-col justify-center items-center text-left">
      <h1 className="text-2xl font-bold mb-4">PMNRF Applications</h1>
      <div className="flex flex-col gap-8">
        {PMNRFData.length > 0 ? PMNRFData.map((item, index) => (
          <div
            key={index}
            className="w-[50vw] border p-4  rounded-lg shadow-md bg-gray-100"
          >
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Adhaar:</strong> {item.adhaar}
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

export default Viewpmnrf;
