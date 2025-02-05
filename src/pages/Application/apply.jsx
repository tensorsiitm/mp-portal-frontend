import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Ell from '../../assets/images/ellipse.jpg';
import { useCreateApplicationMutation } from '../../generated/graphql.tsx';
import { formatAadhaar, formatPhone } from '../../utils/input.js';

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
}

const Apply = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [createApplicationMutation] = useCreateApplicationMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "aadhaar") {
      setFormData(prevData => ({
        ...prevData,
        aadhaar: formatAadhaar(value)
      }))
    } else if(name === "phone") {
      setFormData(prevData => ({
        ...prevData,
        phone: formatPhone(value)
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const res = await createApplicationMutation({
        variables : {
          data : {
            ...formData,
            expectedExpenditure : Number(formData.expectedExpenditure)
          }
        }
      })
      
      alert(`Submitted with ID: ${res.data.createApplication.appId}`);
      setFormData(defaultFormData);
    } catch (error) {
      console.log(error);
    }
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
            <h1 className="text-6xl font-semibold text-center">Application</h1>
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
                <label htmlFor="aadhaar" className="block text-lg font-medium text-gray-700">
                  ADHAAR NUMBER:
                </label>
                <input
                  type="text"
                  id="aadhar"
                  name="aadhaar"
                  value={formData.aadhaar}
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
              </div>


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
