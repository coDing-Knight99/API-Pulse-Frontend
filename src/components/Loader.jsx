import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#050508]/70 backdrop-blur-sm">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-purple-300/10 bg-white/[0.03] shadow-2xl shadow-purple-950/30" />
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700/70 border-r-purple-500 border-t-purple-200" />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  )
}

export default Loader
