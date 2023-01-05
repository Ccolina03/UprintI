import React, { useContext } from 'react'
import Link from 'next/dist/client/link'
import { CartContext } from '../context/shopContext'
import MiniCart from './MiniCart'

export default function Nav() {
    const  {cart, cartOpen, setCartOpen} = useContext(CartContext)

    let cartQuantity = 0
    cart.map(item => {
        return (cartQuantity += item?.variantQuantity)
    })

    //
  return (
    <header className='border-b sticky top-0 z-20 bg-white'>
        <div className='flex items-center justify-between max-w-8xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl'>
        <Link href='/' passHref>
            <a className='cursor-pointer'>
                <span className='text-xl pt-0 font-extrabold'>
                    UPrintI
                </span>
            </a>
        </Link>
        <a className='text-xl font-bold cursor-pointer'
        onClick={() => setCartOpen(!cartOpen)}>
            Cart ({cartQuantity})
        </a>
        <MiniCart cart={cart} />  
        </div>

    </header>
  )
}
