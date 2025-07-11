import React, {useContext, useState} from 'react'
import LeftBar from '../components/LeftBar'
import Container from '../components/ChatContainer'
import RigthBar from '../components/RigthBar'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {
 
  const {selectedUser} = useContext(ChatContext)

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden 
        h-[100%] grid grid-cols-1 relative ${selectedUser ? 
        'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>
      
      <LeftBar />
      <Container />
      <RigthBar />
      </div>
    </div>
  )
}

export default HomePage
