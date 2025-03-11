import React from 'react'
import Button from '@mui/material/Button'
import { Menu } from 'lucide-react'
const Nav = () => {
  return (
    <div className="w-full flex items-center justify-center">
    <div className='p-5 text bg-white/40  ring-1 ring-gray-100  backdrop-blur-md rounded-lg flex justify-between w-full items-center max-w-[700px]'>
        <h1 className='text-xl font-semibold '>AI Documa</h1>
        <div className="">
          <Button variant="text" color="inherit" ><Menu /></Button>

          {/* <Button variant="contained" color="primary" size="medium">Get Started</Button> */}
        </div>
    </div>
    </div>
  )
}

export default Nav