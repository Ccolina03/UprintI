import { createContext, useState, useEffect } from "react";
import {createCheckout, updateCheckout} from '../lib/shopify'


const CartContext=createContext()

export default function ShopProvider({children}) {
    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen]=useState(false)
    const [checkoutId, setCheckoutId] = useState('')
    const [checkoutUrl, setCheckoutUrl] = useState('')
    
   
    useEffect(() => { //handling if 0 or more items in Cart  
        if (localStorage.checkout_id) {
            const cartObject = JSON.parse(localStorage.checkout_id)
            if (cartObject[0].id) {
                setCart(cartObject[0])
            } else if (cartObject[0].length > 0) {
                setCart(...[cartObject[0]])
            }

            setCheckoutId(cartObject[1].id)
            setCheckoutUrl(cartObject[1].webUrl)
        }}, [])
   
   
   
   
    async function addToCart(newItem){

        setCartOpen(true) //Available Cart when item added
        if (cart.length ===0) {
            setCart([newItem])
          
        const checkout = await createCheckout(newItem.id, newItem.variantQuantity)
        setCheckoutId(checkout.id)
        setCheckoutUrl(checkout.webUrl)

        localStorage.setItem('checkout_id', JSON.stringify([newItem, checkout]))
    } else {
        let newCart = []
        let adding = false

        cart.map(item => { //check if item exists to increase and pass to NewCart
            if (item.id === newItem.id) {
                item.variantQuantity++
                newCart = [...cart]
                adding = true }
        })

        if(!adding) {
            newCart = [...cart, newItem]
        }
        setCart(newCart) //update after adding Cart feature
        const newCheckout = await updateCheckout(checkoutId, newCart)
        localStorage.setItem('checkout_id', JSON.stringify([newCart, newCheckout]))
    }
    }
    
    async function removeCartItem(itemToRemove) {
        const updatedCart=cart.filter(item => item.id !== itemToRemove)
        setCart(updatedCart)
        const newCheckout = await updateCheckout(checkoutId, updatedCart)
        localStorage.setItem("checkout_id", JSON.stringify([updatedCart, newCheckout]))
     

if (cart.length === 1) {
    setCartOpen(false)
    
}
    }



    return (
        <CartContext.Provider value={{cart, cartOpen, setCartOpen, addToCart, checkoutUrl, removeCartItem}} >
        {children}
        </CartContext.Provider>
    )
}

const ShopConsumer = CartContext.Consumer 

export{CartContext, ShopConsumer}