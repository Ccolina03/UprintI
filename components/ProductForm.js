import { formatter } from "../utils/helpers"
import { useState, useContext } from "react"
import ProductOptions from "./ProductOptions"
import { CartContext } from "../context/shopContext"



export default function ProductForm({product}) {

    const {addToCart} = useContext(CartContext)
    const allVariantOptions= product.variants.edges?.map(variant => {
        const allOptions = {}

        variant.node.selectedOptions.map(key => {
            allOptions[key.name] = key.value
        }) //end of second loop

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

    const defaultV = {}
    product.options.map(key => {
        defaultV[key.name]=key.values[0]
    })
    
    const [selectedVariant, setSelectedVariant] =useState(allVariantOptions[0])
    const [selectedOptions, setSelectedOptions] = useState(defaultV)
    
    function setOptions(name, value) {
        setSelectedOptions(prevState => {
            return {...prevState, [name]: value}
        })
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
      <span className="pb-6">{formatter.format(product.variants.edges[0].node.price.amount)}
      </span>
      {
        product.options.map(({ name, values}) => (
            <ProductOptions 
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions={setOptions}
             />
        ))
      }
      <button
      onClick={() => {
        addToCart(selectedVariant)
      }} className="bg-black text-white rounded-lg px-2 py-3 hover:bg-gray800"> Add + To Card</button>
    </div>
  )
    }
