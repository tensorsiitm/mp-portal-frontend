import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Eq from "./Eq.jsx";
import General from "./General.jsx";
import CMDRF from "../CMDRF/apply.jsx";
import PMNRF from "../PMNRF/apply.jsx";

const Apply = () => {

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
          <option value="general">General</option>
          <option value="pmnrf">PMNRF</option>
          <option value="cmdrf">CMDRF</option>
          <option value="eq">EQ</option>
        </select>

        {/* EQ Form */}
        {category === "eq" && <Eq />}

        {/* General Form */}
        {category === "general" && <General />}

        {category === "pmnrf" && <PMNRF />}
        {category === "cmdrf" && <CMDRF />}
      </div>
    </div>
  );
};

export default Apply;
