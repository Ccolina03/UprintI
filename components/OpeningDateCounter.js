import React, { useState, useEffect } from 'react'

export default function OpeningDateCounter() {

  //4 states
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  //Change will happen once 
  useEffect(() => {
    const target = new Date("05/05/2024 00:00:00") //target date
    const interval = setInterval(() => {
      const now = new Date().getTime() //Current time
      const countDownDate = target.getTime() //target time
      const difference = countDownDate - now  //time difference to display
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24))  //divide number over day, integer result
      setDays(d)

      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) //divide day over hour
      setHours(h)

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)) //divide hours over minutes
      setMinutes(m)

      const s = Math.floor((difference % (1000 * 60)) / (1000))//divide minutes over seconds
      setSeconds(s)
    }, 1000) //execute every second (1000 milliseconds)

    return () => clearInterval(interval) //clearing numbers when unmounting
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
