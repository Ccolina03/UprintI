import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

//Layout will take entire application to be a children
//Allows Nav and Footer to be the same everywhere

export default function Layout({children}) {
  return (
    <div className='flex flex-col justify-between-min-h-screen'>
      <Nav />
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  )
}
