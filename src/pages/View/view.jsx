import React from 'react';
import Ell from '../../assets/images/ellipse.jpg';
import { useNavigate } from 'react-router-dom';

const View = () => {
  const navigate = useNavigate();

  const ViewcmnrfClick = () => {
    navigate('/viewcmnrf');
  };

  const ViewpmnrfClick = () => {
    navigate('/viewpmnrf');
  };

  return (
    <div>
      <div className="flex flex-row font-judson h-[100vh] w-[100vw] overflow-hidden bg-[#ffffff]">
        <div className="flex flex-col justify-center items-center">
          <img src={Ell} className="w-[20vw]" alt="Ellipse" />
          <div className="absolute text-4xl text-white font-medium text-center justify-center flex flex-col">
            <p>WELCOME</p>
            <p className="mt-[10px]">TO</p>
            <p className="mt-[10px]">MPs PORTAL</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center align-middle w-[80vw] gap-[10vh] pt-[8vh]">
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold">APPLICATIONS</h1>
            <p className="text-2xl font-medium mt-[5px]">Select Category</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-[1vh]">
            <div
              className="w-[70vw] h-[15vh] rounded-xl bg-[#ddcfcf] drop-shadow-xl flex flex-col justify-center cursor-pointer"
              onClick={ViewpmnrfClick}
            >
              <h1 className="text-3xl font-bold text-center">PMNRF</h1>
            </div>

            <div
              className="w-[70vw] h-[15vh] rounded-xl bg-[#ddcfcf] drop-shadow-xl flex flex-col justify-center cursor-pointer"
              onClick={ViewcmnrfClick}
            >
              <h1 className="text-3xl font-bold text-center">CMNRF</h1>
            </div>
          </div>

          <p className="text-center">@ Developed by Tensors IIT Madras</p>
        </div>
      </div>
    </div>
  );
};

export default View;
