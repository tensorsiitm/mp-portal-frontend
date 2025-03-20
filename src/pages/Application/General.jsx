import React, { useState } from "react";
import { formatAadhaar, formatPhone } from "../../utils/input.js";
import {
  useCreateApplicationMutation,
  ApplicationType,
} from "../../generated/graphql.tsx";
import { FaTrashAlt } from "react-icons/fa";
import fileUrlGenerator from "../../utils/fileUpload.js"

const defaultFormData = {
  name: "",
  aadhaar: "",
  phone: "",
  address: "",
  issue: "",
  remarks: "",
  expectedExpenditure: "",
  type: ApplicationType.General,
};

const General = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const office = sessionStorage.getItem('office_code')

  const [createApplicationMutation] = useCreateApplicationMutation();

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

      const res = await createApplicationMutation({
        variables: {
          data: {
            ...formData,
            expectedExpenditure: Number(formData.expectedExpenditure),
            fileUrl
          },
        },
      });

      alert(`Submitted with ID: ${res.data.createApplication.appId}`);
      setFormData(defaultFormData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <> COMMENTED</>
    <div>
      <div className="mt-4 w-[100vw] h- justify-center items-center ">
        <h2 className="text-3xl text-[#1c5dca] font-bold text-center">
          General Form
        </h2>
        <form
          className="w-[100vw] px-[15vw] flex flex-col gap-[3vh]"
          onSubmit={handleSubmit}
        >
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
                className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                required
              />
            </div>
            <div className="mt-[3vh]">
              <label
                htmlFor="aadhaar"
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
                className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
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
                className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                required
              />
            </div>
            <div className="mt-[3vh]">
              <label
                htmlFor="issue"
                className="block text-lg font-medium text-gray-700"
              >
                ISSUE:
              </label>
              <textarea
                id="issue"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                required
              />
            </div>
            <div className="mt-[3vh]">
              <label
                htmlFor="remarks"
                className="block text-lg font-medium text-gray-700"
              >
                REMARKS:
              </label>
              <input
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                required
              />
            </div>
            <div className="mt-[3vh]">
              <label
                htmlFor="expenditure"
                className="block text-lg font-medium text-gray-700"
              >
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
      </div>
    </div>
  );
};

export default General;
