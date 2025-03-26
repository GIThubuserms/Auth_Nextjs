import React from 'react'

function page({params}) {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex justify-center items-center flex-col'>
       <h1 className='text-slate-500 text-xl '>{params.id}</h1>
      </div>
    </div>
  )
}

export default page
