/*
  Component made for Next.js v12
  Instructions:
    1. Line 18 contains the date on which you wish the counter to stop, MM/DD/YYYY
    2. Change copy of the component to your own
*/

import React, { useState, useEffect } from 'react'

export default function OpeningDateCounter() {

  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const target = new Date("05/05/2023 00:00:00")
    const interval = setInterval(() => {
      const now = new Date()
      const difference = target.getTime() - now.getTime()
      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      setDays(d)

      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      setHours(h)

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      setMinutes(m)

      const s = Math.floor((difference % (1000 * 60)) / (1000))
      setSeconds(s)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="shadow-2xl lg:w-1/3 p-1  mx-auto font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg"> 
      <div className="flex space-x-1 justify-around ">
        <div className="flex-col w-16 text-center">
          <p className="text-3xl font-bold text-pink-500 bg-white rounded-xl sm: mt-2">{days}</p>
          <p>Days</p>
        </div>
        <div className="flex-col w-16 text-center">
          <p className="text-3xl font-bold text-pink-500 bg-white rounded-xl sm: mt-2">{hours}</p>
          <p>Hours</p>
        </div>
        <h3 className="mt-3 mb-3 text-2xl font-extrabold text-center bg-gradient-to-r from-green-400 via-yellow-500 to-gray-200 text-transparent bg-clip-text ">
        Opening Soon!!
      </h3>
        <div className="flex-col w-16 text-center">
          <p className="text-3xl font-bold text-pink-500 bg-white rounded-xl sm: mt-2 ">{minutes}</p>
          <p>Minutes</p>
        </div>
        <div className="flex-col w-16 text-center">
          <p className="text-3xl font-bold text-pink-500 bg-white rounded-xl sm: mt-2">{seconds}</p>
          <p>Sec.</p>
        </div>

      </div>
    </div>
  )
}
