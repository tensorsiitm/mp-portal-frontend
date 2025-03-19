import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "../../components/navbar/navbar";
// import { useCreateApplicationMutation } from '../../generated/graphql.tsx';
import { formatAadhaar, formatPhone } from "../../utils/input.js";
import { FaTrashAlt } from "react-icons/fa";
// import fileUrlGenerator from '../../utils/fileUpload.js';
import Eq from "./Eq.jsx";
import General from "./General.jsx";
import CMNRF from "../../pages/CMNRF/apply.jsx";
import PMNRF from "../../pages/PMNRF/apply.jsx";

const Apply = () => {
  // const [createApplicationMutation] = useCreateApplicationMutation();

  const [category, setCategory] = useState("general");
  return (
    <div>
      <div className="absolute z-10 ">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-center bg-[#fff] pt-[15vh]">
        <h1 className="text-4xl font-bold text-[#2e3fd2] mb-[5vh]">
          Application Details
        </h1>
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
        {category === "eq" && <Eq />}

        {/* General Form */}
        {category === "general" && <General />}

        {category === "pmnrf" && <PMNRF />}
        {category === "cmnrf" && <CMNRF />}
      </div>
    </div>
  );
};

export default Apply;
