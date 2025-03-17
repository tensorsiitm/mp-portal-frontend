import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import { useCreateApplicationMutation } from '../../generated/graphql.tsx';
import { formatAadhaar, formatPhone } from '../../utils/input.js';
import { FaTrashAlt } from "react-icons/fa";
import fileUrlGenerator from '../../utils/fileUpload.js';

const Apply = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('general');
  const [area,setArea]=useState('')
  // General form states
  const [name, setName] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [issue, setIssue] = useState('');
  const [remarks, setRemarks] = useState('');
  const [expectedExpenditure, setExpectedExpenditure] = useState('');
  
  // PMNRF additional states
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  
  // EQ specific states
  const [trainNumber, setTrainNumber] = useState('');
  const [dateOfJourney, setDateOfJourney] = useState('');
  const [pnrNumber, setPnrNumber] = useState('');
  const [travelClass, setTravelClass] = useState('');
  const [boardingFrom, setBoardingFrom] = useState('');
  const [reservedUpTo, setReservedUpTo] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [createApplicationMutation] = useCreateApplicationMutation();

  const handleFileChange = (e) => {
    const file_ = e.target.files[0];
    if (file_) {
      setFile(file_);
      setFileName(file_.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fileUrl = '';
      if(file) {
        fileUrl = fileUrlGenerator(file,fileName);
      }
      
      // Collect form data based on category
      let formData = {};
      
      if (category === 'general') {
        formData = {
          name,
          aadhaar,
          phone,
          issue,
          remarks,
          expectedExpenditure: Number(expectedExpenditure),
          fileUrl
        };
      } else if (category === 'pmnrf') {
        formData = {
          name,
          aadhaar,
          phone,
          address,
          issue,
          remarks,
          expectedExpenditure: Number(expectedExpenditure),
          to,
          subject,
          fileUrl
        };
      } else if (category === 'cmnrf') {
        formData = {
          name,
          aadhaar,
          fileUrl
        };
      } else if (category === 'eq') {
        formData = {
          name,
          aadhaar: trainNumber, // Using aadhaar field for train number
          phone: dateOfJourney, // Using phone field for date of journey
          pnrNumber,
          travelClass,
          boardingFrom,
          reservedUpTo,
          numberOfSeats,
          contactNumber,
          fileUrl
        };
      }
      
      const res = await createApplicationMutation({
        variables: { data: formData },
      });
      
      alert(`Submitted with ID: ${res.data.createApplication.appId}`);
      
      // Reset form fields
      setName('');
      setAadhaar('');
      setPhone('');
      setAddress('');
      setIssue('');
      setRemarks('');
      setExpectedExpenditure('');
      setTo('');
      setFrom('');
      setSubject('');
      setBody('');
      setTrainNumber('');
      setDateOfJourney('');
      setPnrNumber('');
      setTravelClass('');
      setBoardingFrom('');
      setReservedUpTo('');
      setNumberOfSeats('');
      setContactNumber('');
      setFile(null);
      setFileName('');
      setArea('')
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="absolute z-10 ">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-center pt-[15vh]">
        <h1 className='text-4xl font-bold text-[#2e3fd2] mb-[5vh]'>Application Details</h1>
        <h1 className="text-4xl font-light">Select Category</h1>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-4 p-2 border-2 border-blue-600 rounded-xl"
        >
          <option value="">Select an option</option>
          <option value="general">General</option>
          <option value="pmnrf">PMNRF</option>
          <option value="cmnrf">CMNRF</option>
          <option value="eq">EQ</option>
        </select>

        {/* EQ Form */}
        {category === 'eq' && (
          <div className="mt-4 w-[100vw] h-[] justify-center items-center ">
            <h2 className="text-3xl text-[#1c5dca] font-bold text-center">EQ</h2>
            <form className="w-[100vw] px-[15vw] flex flex-col gap-[3vh]" onSubmit={handleSubmit}>
              <div className="top-0 bg-white z-1 py-4">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                    NAME:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                    AREA:
                  </label>
                  <input
                    type="text"
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>



                <div className="mt-[3vh]">
                  <label htmlFor="trainNumber" className="block text-lg font-medium text-gray-700">
                    TRAIN NUMBER:
                  </label>
                  <input
                    type="text"
                    id="trainNumber"
                    value={trainNumber}
                    onChange={(e) => setTrainNumber(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>
                <div className="mt-[3vh]">
                  <label htmlFor="dateOfJourney" className="block text-lg font-medium text-gray-700">
                    DATE OF JOURNEY:
                  </label>
                  <input
                    type="date"
                    id="dateOfJourney"
                    value={dateOfJourney}
                    onChange={(e) => setDateOfJourney(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>

                <div className="mt-[3vh]">
                  <label htmlFor="pnrNumber" className="block text-lg font-medium text-gray-700">
                    PNR No:
                  </label>
                  <input
                    type="text"
                    id="pnrNumber"
                    value={pnrNumber}
                    onChange={(e) => setPnrNumber(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>

                <div className="mt-[3vh]">
                  <label htmlFor="travelClass" className="block text-lg font-medium text-gray-700">
                    CLASS:
                  </label>
                  <input
                    type="text"
                    id="travelClass"
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>

                <div className="mt-[3vh]">
                  <label htmlFor="boardingFrom" className="block text-lg font-medium text-gray-700">
                    BOARDING FROM:
                  </label>
                  <input
                    type="text"
                    id="boardingFrom"
                    value={boardingFrom}
                    onChange={(e) => setBoardingFrom(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>
                <div className="mt-[3vh]">
                  <label htmlFor="reservedUpTo" className="block text-lg font-medium text-gray-700">
                    RESERVED UP TO:
                  </label>
                  <input
                    type="text"
                    id="reservedUpTo"
                    value={reservedUpTo}
                    onChange={(e) => setReservedUpTo(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>

                <div className="mt-[3vh]">
                  <label htmlFor="numberOfSeats" className="block text-lg font-medium text-gray-700">
                    NUMBER OF SEATS:
                  </label>
                  <input
                    type="text"
                    id="numberOfSeats"
                    value={numberOfSeats}
                    onChange={(e) => setNumberOfSeats(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>
                <div className="mt-[3vh]">
                  <label htmlFor="contactNumber" className="block text-lg font-medium text-gray-700">
                    CONTACT NUMBER:
                  </label>
                  <input
                    type="text"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {/* General Form */}
        {/* {category === 'general' && (
          <div className="mt-4 w-[100vw] h- justify-center items-center ">
            <h2 className="text-3xl text-[#1c5dca] font-bold text-center">General Form</h2>
            <form className="w-[100vw] px-[15vw] flex flex-col gap-[3vh]" onSubmit={handleSubmit}>
              <div className="top-0 bg-white z-1 py-4">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                    NAME:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>
                <div className="mt-[3vh]">
                  <label htmlFor="aadhaar" className="block text-lg font-medium text-gray-700">
                    ADHAAR NUMBER:
                  </label>
                  <input
                    type="text"
                    id="aadhaar"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(formatAadhaar(e.target.value))}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>
                <div className="mt-[3vh]">
                  <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
                    PHONE NUMBER:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>
                <div className="mt-[3vh]">
                  <label htmlFor="issue" className="block text-lg font-medium text-gray-700">
                    ISSUE:
                  </label>
                  <textarea
                    id="issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>
                <div className="mt-[3vh]">
                  <label htmlFor="remarks" className="block text-lg font-medium text-gray-700">
                    REMARKS:
                  </label>
                  <input
                    id="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                    required
                  />
                </div>
                <div className="mt-[3vh]">
                  <label htmlFor="expenditure" className="block text-lg font-medium text-gray-700">
                    EXPECTED EXPENDITURE:
                </label>
                <input
                  id="expenditure"
                  name="expectedExpenditure"
                  value={formData.expectedExpenditure}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>
            </div>  */}

            {/* <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          </div>
        )} */}




      </div>
    </div>
  );
};

export default Apply;