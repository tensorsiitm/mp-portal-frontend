import React, { useState } from 'react'
import Navbar from '../../components/navbar/navbar'
import Ell from '../../assets/images/ellipse.jpg'
// import Ell from '../../assets/images/ellipse.jpg'
import { motion } from "framer-motion";
const Login = () => {
    const [head, setHead] = useState(false);
    const [login, setLogin] = useState(false);
    const nextclick=()=>{
        setHead(true)
    }
    const loginclick=()=>{
        setLogin(true)
    }
  return (
    <motion.div>
       <motion.div className='absolute'>
        <Navbar />
        </motion.div>
      <motion.div className='flex flex-row font-judson h-[100vh] w-[100vw] overflow-hidden bg-[#ffffff]'>
      
        <motion.div className='flex flex-col justify-center items-center'>
          <img src={Ell} className='w-[20vw]' alt="Ellipse" />
          <motion.div className='absolute text-4xl text-white font-medium text-center justify-center flex flex-col'>
            <p>WELCOME</p>
            <p className='mt-[10px]'>TO</p>
            <p className='mt-[10px]'>MPs PORTAL</p>
          </motion.div>
        </motion.div>

        <motion.div className='flex flex-col justify-center items-center align-middle w-[80vw] gap-[0vh] pt-[8vh]'>


        
{head ? <>


{login?<>

    <motion.div className='flex flex-col justify-center items-center'>
     <p className='text-3xl '>LOGIN HERE!</p>
          <motion.div className='flex flex-col justify-center items-start gap-[1vh]'>
              
                <label className='font-light text-black text-xl'>Office: <br/></label>
                <input type='text' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' />
                <label className='font-light text-black text-xl'>Password: <br/></label>
                <input type='text' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' />
               <p>Not registerd? <span onClick={loginclick} className='cursor-pointer text-[#1c5dca]'>Register Here</span></p>
                    
                </motion.div>


                <button className='mt-[5vh] w-[150px] h-[40px] rounded-xl bg-[#1c5dca] text-xl text-white'>Login</button>
          </motion.div>

</>:<>

    <motion.div className='flex flex-col justify-center items-center'>
     <p className='text-3xl '>REGISTER HERE!</p>
          <motion.div className='flex flex-col justify-center items-start gap-[1vh]'>
                   <label className='font-light text-black text-xl'>Name: <br/></label>
                <input type='text' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' /> 
                <label className='font-light text-black text-xl'>Email: <br/></label>
                <input type='text' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' />
                <label className='font-light text-black text-xl'>Office: <br/></label>
                <input type='text' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' />
                <label className='font-light text-black text-xl'>Password: <br/></label>
                <input type='text' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' />
               <p>Already Regisered? <span onClick={loginclick} className='cursor-pointer text-[#1c5dca]'>Login Here</span></p>
                    
                </motion.div>


                <button className='mt-[5vh] w-[150px] h-[40px] rounded-xl bg-[#1c5dca] text-xl text-white'>Regiser</button>
          </motion.div></>}
   


</>:<>

<motion.div className='flex flex-col justify-center items-center text-center mb-[5vh]'>
            <motion.h1 initial={{ x: 200, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}  className='text-4xl font-bold'>Adv. Dean Kuriakose</motion.h1>
            <motion.p initial={{ x: 10, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
       className='text-2xl font-medium mt-[5px]'>Idukki, Member of Parliament</motion.p>
            <motion.p 
            initial={{ x: -10, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}className='mt-[2vh]'>Welcome to MP Portal Have a nice day..!</motion.p>

            <motion.button   initial={{ x: -200, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}  onClick={nextclick} className='mt-[5vh] w-[100px] h-[40px] rounded-xl bg-[#1c5dca] text-xl text-white'>Next</motion.button >
            </motion.div>   

</>}
         
          </motion.div>  
        
          </motion.div>
          
    </motion.div>
  )
}

export default Login
