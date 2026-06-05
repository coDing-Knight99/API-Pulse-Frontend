import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-150  flex justify-center items-center bg-gray-800/40">
        <div className='h-15 w-15 rounded-full border-5 border-t-white animate-spin'></div>
    </div>
  )
}

export default Loader
