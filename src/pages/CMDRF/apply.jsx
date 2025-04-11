import React, { useState } from "react";
import {
  ApplicationType,
  useCreateApplicationMutation,
} from "../../generated/graphql.tsx";
import { formatAadhaar, formatPhone } from "../../utils/input.js";
import { FaTrashAlt } from "react-icons/fa";
import fileUrlGenerator from "../../utils/fileUpload.js";

const defaultFormData = {
  name: "",
  aadhaar: "",
  phone: "",
  address: "",
  issue: "",
  remarks: "",
  expectedExpenditure: "",
  type: ApplicationType.Cmdrf,
};

const Apply = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const office = sessionStorage.getItem('office_code')

  const [createApplicationMutation] = useCreateApplicationMutation({
    onCompleted(data) {
      alert("Submitted with ID: " + data.createApplication.appId);
    },
  });

  const handleFileChange = (e) => {
    const file_ = e.target.files[0];
    if (file_) {
      setFile(file_);
      setFileName(file_.name)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "aadhaar") {
      setFormData((prevData) => ({
        ...prevData,
        aadhaar: formatAadhaar(value),
      }));
    } else if (name === "phone") {
      setFormData((prevData) => ({
        ...prevData,
        phone: formatPhone(value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let fileUrl = ''
      if(file) {
        fileUrl = await fileUrlGenerator(file, office)
      }

      await createApplicationMutation({
        variables: {
          data: {
            ...formData,
            expectedExpenditure: Number(formData.expectedExpenditure),
            fileUrl
          },
        },
      });

      setFormData(defaultFormData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-row h-[100vh] w-[100vw] overflow-hidden bg-[#ffffff]">
        {/* Left Section */}
        {/* <div className="flex flex-col justify-center items-center">
          <img src={Ell} className="w-[20vw]" alt="Ellipse" />
          <div className="absolute text-white font-redHat font-medium text-center justify-center flex flex-col">
            <h1 className="text-6xl font-semibold text-center">CMNRF</h1>
          </div>
        </div> */}

        {/* Right Section */}
        <div className="flex flex-col items-center align-middle w-[100vw] gap-[5vh] z-1 pt-[3vh] overflow-y-auto">
          <div className="bg-white w-full text-center">
            <h1 className="text-4xl font-bold text-gray-800">CMDRF</h1>
          </div>

          {/* Form */}
          <form
            className="w-[90vw] px-[15vw] flex flex-col gap-[3vh]"
            onSubmit={handleSubmit}
          >
            {/* Group 1: Headline and First Inputs */}
            <div className="top-0 bg-white z-1 py-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700"
                >
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
                <label
                  htmlFor="aadhar"
                  className="block text-lg font-medium text-gray-700"
                >
                  ADHAAR NUMBER:
                </label>
                <input
                  type="text"
                  id="aadhaar"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[40px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>
              <div className="mt-[3vh]">
                <label
                  htmlFor="phone"
                  className="block text-lg font-medium text-gray-700"
                >
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
                <label
                  htmlFor="address"
                  className="block text-lg font-medium text-gray-700"
                >
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
                <label
                  htmlFor="healthIssue"
                  className="block text-lg font-medium text-gray-700"
                >
                  HEALTH ISSUE:
                </label>
                <textarea
                  id="healthIssue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[100px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              <div className="mt-[2vh]">
                <label
                  htmlFor="hospital"
                  className="block text-lg font-medium text-gray-700"
                >
                  HOSPITAL:
                </label>
                <input
                  id="hospital"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>

              <div className="mt-[2vh]">
                <label
                  htmlFor="expenditure"
                  className="block text-lg font-medium text-gray-700"
                >
                  EXPECTED EXPENDITURE:
                </label>
                <input
                  id="expectedExpenditure"
                  name="expectedExpenditure"
                  value={formData.expectedExpenditure}
                  onChange={handleChange}
                  className="mt-1 block w-full bg-[#e9dfdf] h-[50px] rounded-md border-gray-300 shadow-xl px-[8px]"
                  required
                />
              </div>
              <div className="max-w-lg mx-auto p- mt-10">
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
