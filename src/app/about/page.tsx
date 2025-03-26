"use client";
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function Page() {
  const [data,setdata]=React.useState('nothing')
  const router=useRouter()

  const logout=async()=>{
    try {
      const res=await axios.post('/api/users/signout')
console.log(res);

      if(res.data.status<400){
        toast.success(res.data.message)
        router.push('/')
      }
       if(res.data.status>=400){
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }

  const getuserdetails=async ()=>{
    try {
      const response=await axios.post('/api/users/Aboutme')
      console.log(response);
      
      if(response.data.user){
        setdata(response.data.user._id)
      }
    } catch (error) {
      toast.error(error)
    }
  }


  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex justify-center items-center flex-col'>
        {data==="nothing"? "Nothing":<Link className='p-3 bg-slate-900 rounded-xl mb-5 hover:bg-slate-700 hover:text-sm ' href={`/about/${data}`}>{data}</Link>}
        <button className='text-sm p-2 mb-4 rounded-sm bg-green-700' onClick={getuserdetails}>Get User Details</button>
        <button className='text-sm p-2 rounded-sm bg-gray-700' onClick={logout}>Logout</button>
      
      </div>
    </div>
  )
}

export default Page
