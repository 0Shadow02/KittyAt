import React from 'react'

const ShinyButton = ({children}:{children:React.ReactNode}) => {
  return (
    <button className="my-5 text-sm sm:text-base sm:px-8 py-3 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-blue-400 transition-all duration-600 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-slate-50 active:scale-95 active:shadow-xl">
     {children}
   </button>
  )
}

export default ShinyButton