import { createContext, useState, useEffect } from "react";
import {createCheckout} from '../lib/shopify'

const CartContext=createContext()
export default function shopProvider({children}) {
    const [cart, setCart] = useState([])
    const [cartOpen, setCartOpen]=useState(false)
    const [checkoutId, setCheckoutId] = useState('')
    const [checkoutUrl, setCheckoutUrl] = useState('')
    
    async function addToCart(newItem){
        if (cart.length ===0) {
            setCart(newItem)

        const checkout = await createCheckout(newItem.id, newItem.variantQuantity)
        setCheckoutId(checkout.id)
        setCheckoutUrl(checkout.webUrl)

        localStorage.setItem('checkout_id', JSON.stringify([newItem, checkout]))
    } else {
        let newCart = {...cart} 
        cart.map(item => { //check if item exists to increase and pass to NewCart
            if (item.id === newItem.id) {
                item.variantQuantity++
                newCart = {...cart}
            }
            else 
            {
                newCart= {...cart, newItem} //copy last cart if id did not match
            }
        })
        setCart(newCart) //update after adding Cart feature
    }
    }
    

    return (
        <div> 

        </div>
    )
}