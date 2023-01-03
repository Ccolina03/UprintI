import { formatter } from "../utils/helpers"
import { useState, useContext } from "react"
import ProductOptions from "./ProductOptions"
import { CartContext } from "../context/shopContext"
import useSWR from "swr"
import axios from "axios"

const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data)

export default function ProductForm({ product }) {

  const { data: productInventory } = useSWR(
    ['/api/available', product.handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  )

    //Introducing SWR hook and passing url and id

    const {addToCart} = useContext(CartContext)

    //if product.variants.edges root exist then product has maybe color,size,etc., 
    //variants are product specific one-by-one, 

    const allVariantOptions= product.variants.edges?.map(variant => {
        const allOptions = {} //one for each Variant

        //exm: AllOptions['color'] = black, size,etc.
        variant.node.selectedOptions.map(key => {
            allOptions[key.name] = key.value
        }) 
        //end of loop inside first loop
      
        //quicker access to rest of product features
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

    //product.options is different to variants. options give you all possible option for color, size, etc in one set.
    const defaultV = {}
    product.options.map(key => {
        defaultV[key.name]=key.values[0]
    })

    //default Value will be first one in options. 
    
    //both are set to first values from database

    const [selectedVariant, setSelectedVariant] =useState(allVariantOptions[0])
    const [selectedOptions, setSelectedOptions] = useState(defaultV)
    

    function setOptions(name, value) {
        setSelectedOptions(prevState => {
            return {...prevState, [name]: value}
            //return object where past state is speread, and add new name and value (from the options)
        })
    //setOption passes with this new object to ProductOptions
        const selection = {...selectedOptions, [name]: value}

        allVariantOptions.map(item => {
            if (JSON.stringify(item.options)=== JSON.stringify(selection)) {
                setSelectedVariant(item)
            }
        })
    }

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
      <button
      onClick={() => {
        addToCart(selectedVariant)
      }} className="bg-black text-white rounded-lg mt-3 px-2 py-3 hover:bg-gray800"> Add + To Card</button>
    </div>
  )
    }
