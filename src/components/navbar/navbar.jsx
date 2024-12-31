import React from 'react'
import { CgProfile } from "react-icons/cg";
import { useLoginUserMutation } from '../../generated/graphql.tsx';
const Navbar = () => {

  const [loginUserMutation ] = useLoginUserMutation()

  const handleClick = async () => {
    const password = prompt('password')

    try {
      const val = await loginUserMutation({variables: {password}})
      sessionStorage.setItem('logged', val.data.loginUser ?? false)
      window.location.reload()
    } catch (err) {
      alert('Wrong Password')
    }
  }

  return (
    <div className='w-[100vw] h-[8vh] bg-[#1c5dca] flex justify-between items-center px-[5vw]'>
      <div>
        <CgProfile className='text-4xl text-[#e7e7e7]'/>
      </div>
      <div>
        <h1 className='text-2xl font-400 text-[#EFEDFF] tracking-wide text-center font-redHat'>MPs Manager Portal</h1>
      </div>
      <div>
        {sessionStorage.getItem('logged') ? null :
        <button onClick={handleClick} className='w-[110px] h-[35px] rounded-xl bg-[#e4e4ea] text-xl text-[#1c5dca] drop-shadow-xl '>Login</button>
        }
      </div>
    </div>
  )
}

export default Navbar
