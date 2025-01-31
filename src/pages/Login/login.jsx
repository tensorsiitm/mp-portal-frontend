import React, { useReducer, useState } from 'react'
import Navbar from '../../components/navbar/navbar'
import Ell from '../../assets/images/ellipse.jpg'
// import Ell from '../../assets/images/ellipse.jpg'
import { motion } from "framer-motion";
import { useCreateUserMutation, useLoginUserMutation } from '../../generated/graphql.tsx';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()

    const [office, setOffice] = useState('')
    const [password, setPassword] = useState('')


    const [login, toggleLogin] = useReducer((state) => {
      setOffice('')
      setPassword('')
      return !state
    }, true);

    const [createUserMutation] = useCreateUserMutation()
    const [loginUserMutation] = useLoginUserMutation()


    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const res = await createUserMutation({
          variables: {
            office,
            password
          }
        })
        sessionStorage.setItem('office_code',res.data.createUser.office)
        navigate('/')
      } catch(err) {
        console.log(err)
      }
    }

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await loginUserMutation({
          variables: {
            office,
            password
          }
        })
        sessionStorage.setItem('office_code', res.data.loginUser.office)
        navigate('/')
      } catch(err) {
        console.log(err)
      }
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

{login?<>

    <motion.form onSubmit={handleLogin} className='flex flex-col justify-center items-center'>
     <p className='text-3xl '>LOGIN HERE!</p>
          <motion.div className='flex flex-col justify-center items-start gap-[1vh]'>
              
                <label className='font-light text-black text-xl'>Office <br/></label>
                <input value={office} onChange={(e) => setOffice(e.target.value)} required type='text' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' />
                <label className='font-light text-black text-xl'>Password <br/></label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} required type='password' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' />
               <p>Not registerd? <span onClick={toggleLogin} className='cursor-pointer text-[#1c5dca]'>Register Here</span></p>
                    
                </motion.div>


                <button type='submit' className='mt-[5vh] w-[150px] h-[40px] rounded-xl bg-[#1c5dca] text-xl text-white'>Login</button>
          </motion.form>

</>:<>

    <motion.form onSubmit={handleRegister} className='flex flex-col justify-center items-center'>
     <p className='text-3xl '>REGISTER HERE!</p>
          <motion.div className='flex flex-col justify-center items-start gap-[1vh]'>
                   {/* <label className='font-light text-black text-xl'>Name: <br/></label>
                <input type='text' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' /> 
                <label className='font-light text-black text-xl'>Email: <br/></label>
                <input type='text' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' /> */}
                <label className='font-light text-black text-xl'>Office <br/></label>
                <input value={office} onChange={(e) => setOffice(e.target.value)} required type='text' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' />
                <label className='font-light text-black text-xl'>Password <br/></label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} required type='password' placeholder='Enter Your Name here' className='w-[25vw] h-[50px] rounded-xl border-1 bg-[#0000000e] text-lg px-[10px]' />
               <p>Already Regisered? <span onClick={toggleLogin} className='cursor-pointer text-[#1c5dca]'>Login Here</span></p>
                    
                </motion.div>


                <button type='submit' className='mt-[5vh] w-[150px] h-[40px] rounded-xl bg-[#1c5dca] text-xl text-white'>Regiser</button>
          </motion.form></>}
          </motion.div>  
        
          </motion.div>
          
    </motion.div>
  )
}

export default Login
