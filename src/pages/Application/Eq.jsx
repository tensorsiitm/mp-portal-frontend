import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useCreateEqMutation } from "../../generated/graphql.tsx";

import Eqimage from '../../assets/images/eqmpportal.png'

const Eq = () => {
  const [createEQMutation] = useCreateEqMutation();

  const pdfRef = useRef();

  const [area, setArea] = useState("");
  const [name, setName] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [dateOfJourney, setDateOfJourney] = useState("");
  const [pnrNumber, setPnrNumber] = useState("");
  const [travelClass, setTravelClass] = useState("");
  const [boardingFrom, setBoardingFrom] = useState("");
  const [reservedUpTo, setReservedUpTo] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [trainName, setTrainName] = useState("");



  const generatePdf = () => {
    const input = pdfRef.current;

    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgWidth = 210; // A4 width in mm

      // Convert canvas height to maintain aspect ratio
      const pageHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        imgWidth,
        pageHeight
      );

      pdf.save("EQ.pdf");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generatePdf();
    try {
      console.log("HERE")

      const res = await createEQMutation({
        variables: { data: {
          name,
          phone: contactNumber, // Using phone field for date of journey
          from: boardingFrom,
          to: reservedUpTo,
          number: Number(numberOfSeats),
          area,
          class: travelClass,
          date: `${dateOfJourney}T00:00:00Z`,
          PNR: pnrNumber,
          train: trainNumber,
          trainName:trainName
        } },
      });

      console.log("DONE")

      alert(`Submitted with ID: ${res.data.createEQ.id}`);


      setName("");
      setTrainNumber("");
      setDateOfJourney("");
      setPnrNumber("");
      setTravelClass("");
      setBoardingFrom("");
      setReservedUpTo("");
      setNumberOfSeats("");
      setContactNumber("");
      setArea("");
      setTrainName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* TEMPLATE */}
      <div
  ref={pdfRef}
  style={{
    width: "794px", // A4 width
    height: "1123px", // A4 height
    backgroundImage: `url(${Eqimage})`,
    backgroundSize: "cover",       // Makes it fill the entire container
    backgroundPosition: "center",  // Centers the image
    backgroundRepeat: "no-repeat", // Prevents tiling
    fontSize: "16px",
    fontFamily: "Lora",
  }}
  className="absolute z-[-100] flex justify-center items-center  bg-white border border-gray-200"
>

<p className="absolute mb-[480px]  text-sm mr-[570px]">
794 /EQ/TDPA/2025
</p>

<p className="absolute mb-[380px]  text-left font-bold text-sm mr-[570px]">
{area}
</p>



<p className="absolute mb-[505px]  text-sm ml-[550px]">
{dateOfJourney} 
</p>
<div className="border border-black w-[440px] text-[13px] mt-[135px]">
  <div className="flex">
    <div className="w-[176px] bg-gray-300 border border-black pb-[6px] px-[2px]">Train No & Name</div>
    <div className="flex-1 border border-black pb-[6px] px-[2px]">{trainNumber} - {trainName}</div>
  </div>
  <div className="flex">
    <div className="w-[176px] bg-gray-300 border border-black pb-[6px] px-[2px]">Date of journey</div>
    <div className="flex-1 border border-black pb-[6px] px-[2px]">{dateOfJourney} April 11, 2024</div>
  </div>
  <div className="flex">
    <div className="w-[176px] bg-gray-300 border border-black pb-[6px] px-[2px]">PNR No</div>
    <div className="flex-1 border border-black pb-[6px] px-[2px]">{pnrNumber}</div>
  </div>
  <div className="flex">
    <div className="w-[176px] bg-gray-300 border border-black pb-[6px] px-[2px]">Class</div>
    <div className="flex-1 border border-black pb-[6px] px-[2px]">{travelClass}</div>
  </div>
  <div className="flex">
    <div className="w-[176px] bg-gray-300 border border-black pb-[6px] px-[2px]">Boarding from</div>
    <div className="flex-1 border border-black pb-[6px] px-[2px]">{boardingFrom}</div>
  </div>
  <div className="flex">
    <div className="w-[176px] bg-gray-300 border border-black pb-[6px] px-[2px]">Reserved up to</div>
    <div className="flex-1 border border-black pb-[6px] px-[2px]">{reservedUpTo}</div>
  </div>
  <div className="flex">
    <div className="w-[176px] bg-gray-300 border border-black pb-[6px] px-[2px]">Name of the passenger</div>
    <div className="flex-1 border border-black pb-[6px] px-[2px]">{name}</div>
  </div>
  <div className="flex">
    <div className="w-[176px] bg-gray-300 border border-black pb-[6px] px-[2px]">Number of seats</div>
    <div className="flex-1 border border-black pb-[6px] px-[2px]">{numberOfSeats}</div>
  </div>
  <div className="flex">
    <div className="w-[176px] bg-gray-300 border border-black pb-[6px] px-[2px]">Contact no of the passenger</div>
    <div className="flex-1 border border-black pb-[6px] px-[2px]">{contactNumber}</div>
  </div>
</div>


       
      </div>

      {/* MAIN SECTION */}

      <div className="mt-4 w-[100vw]   h-[] py-[5vh] justify-center items-center bg-white">
        <h2 className="text-3xl text-[#1c5dca] font-bold text-center">EQ</h2>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
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
              <label
                htmlFor="trainNumber"
                className="block text-lg font-medium text-gray-700"
              >
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

            <div>
              <label
                htmlFor="trainName"
                className="block text-lg font-medium text-gray-700"
              >
                TRAIN NAME:
              </label>
              <input
                type="text"
                id="train-name"
                value={trainName}
                onChange={(e) => setTrainName(e.target.value)}
                className="mt-1 block w-full bg-[] h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
                required
              />
            </div>



            <div className="mt-[3vh]">
              <label
                htmlFor="dateOfJourney"
                className="block text-lg font-medium text-gray-700"
              >
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
              <label
                htmlFor="pnrNumber"
                className="block text-lg font-medium text-gray-700"
              >
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
              <label
                htmlFor="travelClass"
                className="block text-lg font-medium text-gray-700"
              >
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
              <label
                htmlFor="boardingFrom"
                className="block text-lg font-medium text-gray-700"
              >
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
              <label
                htmlFor="reservedUpTo"
                className="block text-lg font-medium text-gray-700"
              >
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
              <label
                htmlFor="numberOfSeats"
                className="block text-lg font-medium text-gray-700"
              >
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
              <label
                htmlFor="contactNumber"
                className="block text-lg font-medium text-gray-700"
              >
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
            Submit & Download as PDF
          </button>

          {/* <button
              onClick={generatePdf}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600">
                Download PDF
              </button> */}
        </form>
      </div>
    </div>
  );
};

export default Eq;
