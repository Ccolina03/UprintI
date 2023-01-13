import { formatter } from "../utils/helpers"
import { useState, useContext, useEffect } from "react"
import ProductOptions from "./ProductOptions"
import { CartContext } from "../context/shopContext"
import useSWR from "swr"
import axios, { all } from "axios"


const fetcher = (url, id) =>(
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data))

export default function ProductForm({ product }) {
 //Introducing SWR hook and passing url and id
  const { data: productInventory } = useSWR(
    ['/api/available', product.handle],
    (url, id) => fetcher(url, id),
    { errorRetryCount: 3 }
  )
  
  const [existant, setExistant] = useState(true)

    const {addToCart} = useContext(CartContext)


    //allVariantOptions returns specific features of each option
    //allOptions creates object featuring variant specific option (Exm:{ Color: 'Black', Size: 'XXL' },)
    
    const allVariantOptions= product.variants.edges?.map(variant => {
        const allOptions = {} 

        variant.node.selectedOptions.map(option => {
            allOptions[option.name] = option.value
        }) 
        //end of loop inside first loop

    return {
        title: product.title,
        id: variant.node.id,
        image: variant.node.image?.url,
        handle: product.handle,
        options: allOptions,
        variantTitle: variant.node.title,
        variantPrice: variant.node.price.amount,
        variantQuantity: 1
    }
    }) //end of first loop

    
    
    //Setting first option of variant as Default Value
    const defaultV = {}
    product.options.map(key => {
        defaultV[key.name]=key.values[0]
    })

    
    const [selectedVariant, setSelectedVariant] =useState(allVariantOptions[0])
    const [selectedOptions, setSelectedOptions] = useState(defaultV)
    

    //setOptions returns same state, but adding new option combination (option selector feature)
    function setOptions(name, value) {
        setSelectedOptions(prevState => {
            return {...prevState, [name]: value}
        })

    //setOption passes with this new object to ProductOptions
        const selection = {...selectedOptions, [name]: value}

        allVariantOptions.map(item => {
            if (JSON.stringify(item.options)=== JSON.stringify(selection)) {
                setSelectedVariant(item)
            }
        })
    }

    
    useEffect(() => {
      //checking product specific variant
      if (productInventory) {
        const checkExistant = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)
        
        //checking if boolean is true
        if (checkExistant[0].node.availableForSale) {
          setExistant(true)
        } else {
          setExistant(false)
        }
      }
    }, [productInventory, selectedVariant])


    
    return (
    <div className="rounded 2xl shadow-lg p-4 flex flex-col w-full md:w-1/3 ">
        <h2 className="text-2xl font-bold"> {product.title} </h2>
      <span className="pb-3">{formatter.format(product.variants.edges[0].node.price.amount)}
      </span>
      
      {/* Once we get specific title and price, it will go obj destr. all possible name and values (exm: color= black, red, blue, etc)
      
          selectedOptions is a state that will be changed from product to product */}
     
      {
        product.options.map(({ name, values}) => (
            <ProductOptions 
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions={setOptions} //new object from spread state + new name,value 
             />
        ))
      }
      {

        existant ?
        <button
      onClick={() => {
        addToCart(selectedVariant)
      }} className="bg-black text-white rounded-lg mt-3 px-2 py-3 hover:bg-gray800"> Add + To Card</button>
      :

      <button className=" rounded-lg mt-3 px-2 py-3 text-white bg-gray-800 cursor-not-allowed"> Sold Out</button>
      }

    </div>
  )
    }
