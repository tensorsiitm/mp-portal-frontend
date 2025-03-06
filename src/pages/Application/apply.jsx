import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Ell from '../../assets/images/ellipse.jpg';
import { useCreateApplicationMutation } from '../../generated/graphql.tsx';
import { formatAadhaar, formatPhone } from '../../utils/input.js';

import { FaTrashAlt } from "react-icons/fa";  //



const defaultFormData = {
  name: '',
  aadhaar: '',
  phone: '',
  address: '',
  issue: '',
  remarks: '',
  expectedExpenditure: '',
  to: '',
  from: '',
  subject: '',
  body: '',
};

const Apply = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const [category, setCategory] = useState('');
  const [formType, setFormType] = useState('');
  const [formData, setFormData] = useState(defaultFormData);
  const [createApplicationMutation] = useCreateApplicationMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'aadhaar') {
      setFormData((prevData) => ({ ...prevData, aadhaar: formatAadhaar(value) }));
    } else if (name === 'phone') {
      setFormData((prevData) => ({ ...prevData, phone: formatPhone(value) }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createApplicationMutation({
        variables: { data: { ...formData, expectedExpenditure: Number(formData.expectedExpenditure) } },
      });
      alert(`Submitted with ID: ${res.data.createApplication.appId}`);
      setFormData(defaultFormData);
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
          <option value="pmnrf">PMNRF</option>
          <option value="cmnrf">CMNRF</option>
          <option value="eq">EQ</option>
          {/* <option value="d4">D4</option> */}
        </select>

        {category === 'pmnrf' && (
          <div className="mt-4 w-[100vw] h- justify-center items-center ">
            <h2 className="text-3xl text-[#1c5dca] font-bold text-center">PMNRF</h2>
            <form className="w-[100vw] px-[15vw] flex flex-col gap-[3vh]" onSubmit={handleSubmit}>
            {/* Group 1: Headline and First Inputs */}
            <div className="top-0 bg-white z-1 py-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  NAME:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  id="aadhar"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca]  px-[8px]"
                  required
                />
              </div>



              </div>

              <div className="max-w-lg mx-auto p-">
      <label
        htmlFor="file-upload"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg cursor-pointer flex justify-between items-center"
      >
        <span className="text-lg">Choose a File</span>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex items-center space-x-2">
          <span
            className={`text-sm ${
              fileName ? "text-gray-700" : "text-gray-300"
            }`}
          >
            {fileName || "No file chosen"}
          </span>
          {fileName && (
            <button
              onClick={() => setFileName("")}
              className="text-red-500 hover:text-red-700 text-xs flex items-center space-x-1"
            >
              <FaTrashAlt size={14} /> {/* React icon for trash */}
              <span>Remove</span>
            </button>
          )}
        </div>
      </label>
      <p className="text-sm mt-2 text-gray-600">
        Supported formats: JPG, PNG, PDF, DOCX
      </p>
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





{category === 'cmnrf' && (
          <div className="mt-4 w-[100vw] h-[] justify-center items-center ">
            <h2 className="text-3xl text-[#1c5dca] font-bold text-center">CMNRF</h2>
            <form className="w-[100vw] px-[15vw] flex flex-col gap-[3vh]" onSubmit={handleSubmit}>
            {/* Group 1: Headline and First Inputs */}
            <div className="top-0 bg-white z-1 py-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  NAME:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  id="aadhar"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
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













{category === 'eq' && (
              <div className="mt-4 w-[100vw] h-[] justify-center items-center ">
            <h2 className="text-3xl text-[#1c5dca] font-bold text-center">EQ</h2>
            <form className="w-[100vw] px-[15vw] flex flex-col gap-[3vh]" onSubmit={handleSubmit}>
            {/* Group 1: Headline and First Inputs */}
            <div className="top-0 bg-white z-1 py-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  NAME:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  id="aadhar"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                  required
                />
              </div>
            </div>

            {/* Group 2: Scrolling Inputs */}
            {/* <div>
              <div className="mt-[2vh]">
                <label htmlFor="address" className="block text-lg font-medium text-gray-700">
                  ADDRESS:
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[100px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              <div className="mt-[2vh]">
                <label htmlFor="issue" className="block text-lg font-medium text-gray-700">
                  ISSUE:
                </label>
                <textarea
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[100px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              <div className="mt-[2vh]">
                <label htmlFor="remarks" className="block text-lg font-medium text-gray-700">
                  REMARKS:
                </label>
                <input
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              <div className="mt-[2vh]">
                <label htmlFor="to" className="block text-lg font-medium text-gray-700">
                  TO:
                </label>
                <input
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              <div className="mt-[2vh]">
                <label htmlFor="from" className="block text-lg font-medium text-gray-700">
                  FROM:
                </label>
                <input
                  id="from"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              <div className="mt-[2vh]">
                <label htmlFor="subject" className="block text-lg font-medium text-gray-700">
                  SUBJECT:
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              <div className="mt-[2vh]">
                <label htmlFor="body" className="block text-lg font-medium text-gray-700">
                  BODY:
                </label>
                <textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[100px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div> */}

{/* 
              <div className="mt-[vh]">
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
            </div> */}

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          </div>
        )}




      </div>
    </div>
  );
};

export default Apply;