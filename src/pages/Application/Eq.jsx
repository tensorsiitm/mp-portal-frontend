import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useCreateEqMutation } from "../../generated/graphql.tsx";



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
          train: trainNumber
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* TEMPLATE */}

      <div  ref={pdfRef} className="bg-white  text-black px-10 pt-2 pb-6  absolute z-[-100]" style={{ width: "794px", height: "1123px" }}>
      {/* Header */}
      <div className="text-center text-[#268f49]">
        <img src="/sathyameva.png" alt="Emblem" className="mx-auto h-[150px]" />
        <h1 style={{ fontFamily: '"Bookman Old Style", serif' }} className="text-3xl font-bold mt-">ADV. DEAN KURIAKOSE</h1>
        <p className="-mt-1 text-xl font-serif">Member of Parliament (Lok Sabha)</p>
        <p className="text-xl font-serif">IDUKKI - KERALA</p>
      </div>

      <div className="mt-4 text-md font-semibold">
        <p className="italic"  style={{ fontFamily: '"Book Antiqua", Palatino, serif' }}>501/EQ/TDPA/2025</p>

        <p className="font-semibold mt-2"  style={{ fontFamily: '"Book Antiqua", Palatino, serif' }}>The Sr. Divisional Commercial Manager</p>
        <p style={{ fontFamily: '"Book Antiqua", Palatino, serif' }}>{area}</p>

        <p className="mt-4 font-semibold"  style={{ fontFamily: '"Book Antiqua", Palatino, serif' }}>Dear Manager,</p>

        <p style={{ fontFamily: '"Book Antiqua", Palatino, serif' }} className="mt-4 font-md font-medium text-justify">
         &nbsp;&nbsp;&nbsp; The following passenger is making an emergency travel and the ticket is waitlisted.
          Considering the exigent nature of the journey, I would request you to kindly be
          pleased to release an emergency quota for the same.
        </p>
<div className="w-full  flex justify-center">


        <table  style={{ fontFamily: '"Book Antiqua", Palatino, serif' }} className="w-[80%] mt-4 text-md border border-black border-collapse">
          <tbody>
            <tr className="border border-black">
              <td className="border border-black px-1 pb-2 font-medium bg-[#d9d9d9]">Train No & Name</td>
              <td className="border border-black px-1 pb-2">{trainNumber}</td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-1 pb-2 font-medium bg-[#d9d9d9]">Date of journey</td>
              <td className="border border-black px-1 pb-2">{dateOfJourney}</td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-1 pb-2 font-medium bg-[#d9d9d9]">PNR No</td>
              <td className="border border-black px-1 pb-2">{pnrNumber}</td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-1 pb-2 font-medium bg-[#d9d9d9]">Class</td>
              <td className="border border-black px-1 pb-2">{travelClass}</td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-1 pb-2 font-medium bg-[#d9d9d9]">Boarding from</td>
              <td className="border border-black px-1 pb-2">{boardingFrom}</td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-1 pb-2 font-medium bg-[#d9d9d9]">Reserved up to</td>
              <td className="border border-black px-1 pb-2">{reservedUpTo}</td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-1 pb-2 font-medium bg-[#d9d9d9]">Name of the passenger</td>
              <td className="border border-black px-1 pb-2">{name}</td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-1 pb-2 font-medium bg-[#d9d9d9]">Number of seats</td>
              <td className="border border-black px-1 pb-2">{numberOfSeats}</td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black px-1 pb-2 font-medium bg-[#d9d9d9]">Contact no of the passenger</td>
              <td className="border border-black px-1 pb-2">{contactNumber}</td>
            </tr>
          </tbody>
        </table>
        </div>
<div className="w-full mt-2 flex justify-around">
   <div className="">
          <img src="/seal.png" alt="Stamp" className="w-[200px]" />
        </div>


 <div className=""  style={{ fontFamily: '"Book Antiqua", Palatino, serif' }}>
                  <p className="mt-4"  style={{ fontFamily: '"Book Antiqua", Palatino, serif' }}>Thanks & Regards</p>
          <img src="/sign.jpg" alt="Signature" className="absolute h-[110px]" />
          <p className="font-semibold mt-16">Adv. Dean Kuriakose</p>
        </div>


  
</div>

       

   

        <div style={{ fontFamily: 'Calibri, sans-serif' }} className=" text-[#59a774] mt- pt-1 text-sm font-medium text-center">
          <p className="">
            Member : Standing Committee - Education, Women, Children, Youth & Sports | Consultative Committee - Road and Transport
          </p>
          {/* <span className="border-b border-[#59a774] w-full"></span> */}
          <p>
            90, South Avenue, New Delhi - 110 011 | Phone : 011-23011030 | Mob. : +91 – 9447877369
          </p>
          <p>
            E-mail : <a href="mailto:deankuriakosemp@gmail.com" className="text-blue-600 underline">deankuriakosemp@gmail.com</a> |
            <a href="mailto:dean.kuriakose@sansad.nic.in" className="text-blue-600 underline">dean.kuriakose@sansad.nic.in</a>
          </p>
          <p>
            • Opp. PWD Rest House, Telephone Exchange Road, Thodupuzha P.O, Idukki, Kerala PIN – 685 584 Ph. : 04862–222266
          </p>
          <p>
            • Aliakunnel Bldg., Idukki Colony P.O, Cheruthoni, Idukki, PIN - Kerala 685 602 Ph. : 04862-236266
          </p>
        </div>
      </div>
    </div>

      {/* MAIN SECTION */}

      <div className="mt-4   w-[100vw] h-[] py-[5vh] justify-center items-center bg-white">
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
    htmlFor="area"
    className="block text-lg font-medium text-gray-700"
  >
    AREA:
  </label>
  <select
    id="area"
    value={area}
    onChange={(e) => setArea(e.target.value)}
    className="mt-1 block w-full h-[45px] rounded-xl border-2 border-[#1c5dca] px-[8px]"
    required
  >
    <option value="">Select an Area</option>
    <option value="Southern Railway">Southern Railway</option>
    <option value="Central Railway">Central Railway</option>
    <option value="Western Railway">Western Railway</option>
    <option value="Eastern Railway">Eastern Railway</option>
    <option value="Northern Railway">Northern Railway</option>
    <option value="North Eastern Railway">North Eastern Railway</option>
    <option value="South Eastern Railway">South Eastern Railway</option>
    <option value="Northeast Frontier Railway">Northeast Frontier Railway</option>
    <option value="South Central Railway">South Central Railway</option>
    <option value="South Coast Railway">South Coast Railway</option>
    <option value="Konkan Railway">Konkan Railway</option>
    <option value="East Central Railway">East Central Railway</option>
    <option value="South East Central Railway">South East Central Railway</option>
    <option value="North Western Railway">North Western Railway</option>
    <option value="East Coast Railway">East Coast Railway</option>
    <option value="North Central Railway">North Central Railway</option>
    <option value="South Western Railway">South Western Railway</option>
    <option value="West Central Railway">West Central Railway</option>
  </select>
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
