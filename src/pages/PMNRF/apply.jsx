import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Ell from '../../assets/images/ellipse.jpg';

const Apply = () => {
  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    phone: '',
    address: '',
    healthIssue: '',
    hospital: '',
    expenditure: '',
    ward: '',
    applicant: '',
    relation: '',
    subject: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <div className="absolute z-10">
        <Navbar />
      </div>
      <div className="flex flex-row h-[100vh] w-[100vw] overflow-hidden bg-[#ffffff]">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center">
          <img src={Ell} className="w-[20vw]" alt="Ellipse" />
          <div className="absolute text-white font-redHat font-medium text-center justify-center flex flex-col">
            <h1 className="text-6xl font-semibold text-center">PMNRF</h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center align-middle w-[80vw] gap-[5vh] z-1 pt-[17vh] overflow-y-auto">
          <div className="bg-white w-full text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Application Details
            </h1>
          </div>

          {/* Form */}
          <form className="w-[80vw] px-[15vw] flex flex-col gap-[3vh]" onSubmit={handleSubmit}>
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
                  className="mt-1 block w-full bg-[#e9dfdf] h-[40px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>
              <div className="mt-[3vh]">
                <label htmlFor="aadhar" className="block text-lg font-medium text-gray-700">
                  ADHAAR NUMBER:
                </label>
                <input
                  type="text"
                  id="aadhar"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[40px] rounded-md border-gray-300 shadow-xl px-[8px]"
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
                  className="mt-1 block w-full bg-[#e9dfdf] h-[40px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>
            </div>

            {/* Group 2: Scrolling Inputs */}
            <div>
              <div className="mt-[vh]">
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

              <div className="mt-[vh]">
                <label htmlFor="healthIssue" className="block text-lg font-medium text-gray-700">
                  HEALTH ISSUE:
                </label>
                <textarea
                  id="healthIssue"
                  name="healthIssue"
                  value={formData.healthIssue}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[100px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              <div className="mt-[vh]">
                <label htmlFor="hospital" className="block text-lg font-medium text-gray-700">
                  HOSPITAL:
                </label>
                <input
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              <div className="mt-[vh]">
                <label htmlFor="expenditure" className="block text-lg font-medium text-gray-700">
                  EXPECTED EXPENDITURE:
                </label>
                <input
                  id="expenditure"
                  name="expenditure"
                  value={formData.expenditure}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
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

          <p className="text-center">@ Developed by Tensors IIT Madras</p>
        </div>
      </div>
    </div>
  );
};

export default Apply;
