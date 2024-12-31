import React from 'react';
import { useNavigate } from 'react-router-dom';
import Ell from '../../assets/images/ellipse.jpg';
import Pmnrf from '../../assets/images/PMNRF.jpg';
import Cmnrf from '../../assets/images/CMNRF.jpg';
import Navbar from '../../components/navbar/navbar';
function Home() {
  const navigate = useNavigate(); 

  const cmnrfClick = () => {
    navigate('/cmnrf'); 
  };

  const pmnrfClick = () => {
    navigate('/pmnrf');
  };
  

  const viewclick = () => {
    navigate('/view');
  };
  return (
    <>  
    <div className='absolute'>
        <Navbar />
        </div>
      <div className='flex flex-row font-judson h-[100vh] w-[100vw] overflow-hidden bg-[#ffffff]'>
      
        <div className='flex flex-col justify-center items-center'>
          <img src={Ell} className='w-[20vw]' alt="Ellipse" />
          <div className='absolute text-4xl text-white font-medium text-center justify-center flex flex-col'>
            <p>WELCOME</p>
            <p className='mt-[10px]'>TO</p>
            <p className='mt-[10px]'>MPs PORTAL</p>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center align-middle w-[80vw] gap-[10vh] pt-[8vh]'>
          <div className='flex flex-col justify-center items-center text-center'>
            <h1 className='text-4xl font-bold'>Adv. Dean Kuriakose</h1>
            <p className='text-2xl font-medium mt-[5px]'>Idukki, Member of Parliament</p>
          </div>

          {sessionStorage.getItem('logged') ? 
          
          <div className='flex flex-row justify-center items-center gap-[4vw]'>
            <div
              className='w-[20vw] h-[25vw] rounded-3xl bg-white drop-shadow-xl flex flex-col justify-center gap-[20px] cursor-pointer'
                 onClick={pmnrfClick}
            >
              <img src={Pmnrf} className='w-full' alt="PMNRF" />
              <h1 className='text-3xl font-bold text-center'>PMNRF</h1>
            </div>

            <div
              className='w-[20vw] h-[25vw] rounded-3xl bg-white drop-shadow-xl flex flex-col justify-center gap-[40px] cursor-pointer'
              onClick={cmnrfClick} 
            >
              <img src={Cmnrf} className='w-full' alt="CMNRF" />
              <h1 className='text-3xl font-bold text-center'>CMNRF</h1>
            </div>
{/* 
            <div className='w-[20vw] h-[25vw] rounded-3xl bg-[#e7e7e7] drop-shadow-xl flex flex-col justify-center items-center'>
              <IoAddCircle className='text-6xl text-[#8b8b8b]' />
            </div> */}
            
          
            <div
              className='w-[20vw] h-[25vw] rounded-3xl bg-white drop-shadow-xl flex flex-col justify-center gap-[40px] cursor-pointer'
              onClick={viewclick} 
            >
     
              <h1 className='text-3xl font-bold text-center'>View <br/> Applications</h1>
            </div>
          </div>
          : 
          <h1 className='text-4xl font-bold'>Login to continue</h1>
        }

          <p className='text-center'>@ Developed by Tensors IIT Madras</p>
        </div>
      </div>
    </>
  );
}

export default Home;
