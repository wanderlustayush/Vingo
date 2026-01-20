import React from 'react'
import UserDashboard from '../components/UserDashboard'
import OwnerDashboard from '../components/OwnerDashboard'
import DeliveryDashboard from '../components/DeliveryDashboard'
import { useSelector } from 'react-redux'

function Home() {
    const {userData}=useSelector(state=>state.user)
  return (
    <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
      {userData.role=="user" && <UserDashboard/>}
      {userData.role=="owner" && <OwnerDashboard/>}
      {userData.role=="deliveryBoy" && <DeliveryDashboard/>}
    </div>
  )
}

export default Home
