import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Navbar from '../../components/navbar/navbar';
import { useCreateApplicationMutation } from '../../generated/graphql.tsx';
import { formatAadhaar, formatPhone } from '../../utils/input.js';
import { FaTrashAlt } from "react-icons/fa";
import fileUrlGenerator from '../../utils/fileUpload.js';

const Apply = () => {
  const pdfRef = useRef();
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


  const generatePdf = () => {
    const input = pdfRef.current;

    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgWidth = 210; // A4 width in mm
      const imgHeight = 297; // A4 height in mm

      // Convert canvas height to maintain aspect ratio
      const pageHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, pageHeight);

      pdf.save("generated.pdf");
    });
  };


  const handleFileChange = (e) => {
    const file_ = e.target.files[0];
    if (file_) {
      setFile(file_);
      setFileName(file_.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generatePdf()
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
          trainNumber,
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

      {/* Hidden Template for PDF */}
      {/* <div ref={pdfRef} style={{ 
        width: "600px", 
        padding: "20px", 
        background: "#fff", 
        fontSize: "16px" 
      }}>
        <h2>User Details</h2>
        <p>Name: {name}</p>
        <p>Train Number: {trainNumber}</p>
      </div> */}



<div ref={pdfRef}  style={{
          width: "794px", // A4 width in pixels
          height: "1123px", // A4 height in pixel
          background: "#fff",
          fontSize: "16px",
        }} className="w-[] absolute z-[-10]  mx-auto border py-[1%] px-[3%] border-gray-300  bg-white font-serif">


  <div className="flex justify-between items-start mb-4 ">

    <div className="flex flex-col">
      <h1 className="text-green-800 font-bold text-xl">DEAN KURIAKOSE</h1>
      <p className="text-sm">Member of Parliament</p>
      <p className="text-sm">(Lok Sabha)</p>
      <p className="text-sm">Idukki, Kerala</p>
      
      <div className="mt-2">
        <p className="text-sm font-bold text-green-800">Member:</p>
        <p className="text-sm text-green-800">Standing Committee on Labour</p>
        <p className="text-sm text-green-800">Consultive Committee on Rural Development</p>
      </div>
    </div>

    <div className="mx-4">
      <img src="/sathyamlogo.png" alt="National Emblem" className="w-[20vh] mt-[5vh] h-[20vh]" />
    </div>
    
   
    <div className="text-right text-sm">
      <p>90, South Avenue</p>
      <p>New Delhi - 110 011</p>
      <p>Mob : 9447877369</p>
      <p>011-23011030</p>
      <p>E-mail : deankuriakosemp@gmail.com</p>
      <p>dean.kuriakose@sansad.nic.in</p>
    </div>
  </div>
  

  <div className="text-center border border-red-600 text-red-600 font-bold mb-4 w-36  py-[2vh]  mx-auto">
    TOP URGENT
  </div>
  
 
  <div className="text-right mb-4">
    <p>19.01-2025</p>
  </div>
  

  <div className="mb-4">
    <p className="font-bold">The Sr. Divisional</p>
    <p className="font-bold">Commercial Manager,</p>
    <p className="font-bold">Southern Railway</p>
  </div>

  <div className="mb-4">
    <p>Dear Commercial Manager,</p>
  </div>
  

  <div className="mb-4 ">
    <p className="text-justify">
      The following passenger is making an emergency travel and his ticket is
      waitlisted. Considering the exigent nature their journey, I would request you to
      kindly be pleased to release an emergency quota for the same.
    </p>
  </div>


  <div className="grid grid-cols-3 gap-2 mb-4">
    <div className="col-span-2">1. Train No & Name</div>
    <div className="col-span-1">: {trainNumber}</div>
    
    <div className="col-span-2">2. Date of journey</div>
    <div className="col-span-1">: {dateOfJourney}</div>
    
    <div className="col-span-2">3. PNR No</div>
    <div className="col-span-1">: {pnrNumber}</div>
    
    <div className="col-span-2">4. className</div>
    <div className="col-span-1">: {travelClass}</div>
    
    <div className="col-span-2">5. Boarding from</div>
    <div className="col-span-1">: {boardingFrom}</div>
    
    <div className="col-span-2">6. Reserved up to</div>
    <div className="col-span-1">: {reservedUpTo}</div>
    
    <div className="col-span-2">7. Name of party along with official-<br/>status, wherever applicable</div>
    <div className="col-span-1">:{name}+{numberOfSeats-1}</div>
    
    <div className="col-span-2">8. No. of Births/Seats required</div>
    <div className="col-span-1">: {numberOfSeats}</div>
    
    <div className="col-span-2">9. Contact no</div>
    <div className="col-span-1">: {contactNumber}</div>
  </div>
  

  <div className="flex justify-between items-center mt-8">
   
    <div className="w-24 h-24">
      <img src="/sathyamlogo.png" alt="Official Seal" className="w-full h-full rounded-full bg-green-100" />
    </div>
    
 
    <div className="text-right">
      <p>Thanks & Regards</p>
      <div className="h-12 w-32 mt-2 mb-2 ml-auto">
        <img src="/sign.png" alt="Signature" className="ml-auto" />
      </div>
      <p className="font-bold">Adv. Dean Kuriakose</p>
    </div>
  </div>
  
 
  <div className="mt-12 text-center text-xs text-green-800 border-t pt-4">
    <p>MP Office: 1. Opp. PWD Guest House, Telephone Exchange Road, Thodupuzha PO</p>
    <p>Idukki Distt., Kerala - 685584 | Phone: 0486-222266</p>
    <p>MP Office: 2. Aalikunnel Building, Idukki Colony PO, Cheruthoni, Kerala-685602</p>
    <p>Phone: 0486-222266</p>
  </div>
</div>





      <div className="flex flex-col items-center justify-center bg-[#fff] pt-[15vh]">
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
                Submit & Download as PDF
              </button>

         

              {/* <button
              onClick={generatePdf}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600">
                Download PDF
              </button> */}

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