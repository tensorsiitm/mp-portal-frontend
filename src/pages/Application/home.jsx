import React from 'react';
import Cbg from '../../assets/images/cmnrf-bg.jpg';
// import Navbar from '../../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate(); 
  
    const applyClick = () => {
        console.log("Navigating to /cmnrfapply");
      navigate('/application/apply'); 
    };
  
    const viewClick = () => {
      navigate('/application/view');
    };
  
    // const CstatusClick = () => {
    //   navigate('/cmnrf/status');
    // };
  
    return (
      <div className='w-[100vw] h-min-screen pt-[25vh]'>
        <div className="font-judson overflow-hidden flex flex-col justify-center items-center">
          <div className='flex flex-col justify-center items-center overflow-y-hidden'>
            <div className='absolute w-[75vw] overflow-hidden z-1'>
              <img src={Cbg} alt="CMNRF Background" />
            </div>
            <div className='relative flex flex-col justify-center items-center z-100'>
              <h1 className='text-6xl font-bold text-center'>Application</h1>
              
              <button 
                className='w-[500px] h-[60px] text-3xl rounded-3xl bg-[#f17c27] text-white mt-[10vh]' 
                onClick={applyClick}
              >
                Apply
              </button>
              
              <button 
                className='w-[500px] h-[60px] text-3xl rounded-3xl bg-[#4b30ee] text-white mt-[5vh]' 
                onClick={viewClick}
              >
                View Applications
              </button>
              
              {/* <button 
                className='w-[500px] h-[60px] text-3xl rounded-3xl bg-[#00d02e] text-white mt-[5vh]' 
                onClick={CstatusClick}
              >
                Verification Status
              </button> */}
            </div>
          </div>
        </div>
        <p className='text-center relative mt-[10vh]'>@ Developed by Tensors IIT Madras</p>
      </div>
    );
  };
  
  export default Home;
  