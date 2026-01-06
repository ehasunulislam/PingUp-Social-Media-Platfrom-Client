import React from 'react'

const LoadingSkelatonOfMyDay = () => {
  return (
   <div className="flex gap-4">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i}
          className="w-28 sm:w-32 h-44 sm:h-48 rounded-xl bg-gray-400 skeleton"
        >
        </div>
      ))}
    </div>
  )
}

export default LoadingSkelatonOfMyDay
