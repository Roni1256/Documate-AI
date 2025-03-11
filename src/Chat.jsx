import { TextField } from '@mui/material'
import React from 'react'

const Chat = () => {
    window.addEventListener('keydown',(e)=>{
        
    })
  return (
    <div className="h-full w-full flex items-center justify-center ">
        <TextField placeholder='Enter something' color="black" variant="outlined" multiline className='w-full' />

    </div>
  )
}

export default Chat