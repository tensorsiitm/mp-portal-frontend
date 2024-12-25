import React from 'react'
import { CgProfile } from "react-icons/cg";
const navbar = () => {
  return (
    <div className='w-[100vw] h-[8vh] bg-[#1c5dca] flex justify-between items-center px-[5vw]'>
      <div>
        <CgProfile className='text-4xl text-[#e7e7e7]'/>
      </div>
      <div>
        <h1 className='text-2xl font-400 text-[#EFEDFF] tracking-wide text-center font-redHat'>MPs Manager Portal</h1>
      </div>
      <div>
        <button className='w-[110px] h-[35px] rounded-xl bg-[#e4e4ea] text-xl text-[#1c5dca] drop-shadow-xl '>Login</button>
      </div>
    </div>
  )
}

export default navbar
