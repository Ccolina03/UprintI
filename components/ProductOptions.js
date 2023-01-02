import React from 'react'



//ProductOptions is called in ProductForm.js with 4 obj. destr. 
//The stylying here is visualized in the Product Form button section

//First connection with Mini-Cart
export default function ProductOptions({name, values, selectedOptions, setOptions}) {
  return (
    <fieldset className='mt-3'>
        <legend className='text-xl font-semibold'>
            {name}
        </legend>
        <div className='inline-flex flex-wrap items-center'>
        {
            values.map(value => {
                //Exm: option-color-black
                const id = `option-${name}-${value}`

                //if state has specific option from mapping all options then checked true and option will get custom style
                const checked = selectedOptions[name] === value
            
                return (
                    //preidentifier for each label
                    <label key={id} htmlFor={id}>
                        <input className='sr-only'
                        type='radio'
                        id={id}
                        name={`option-${name}`}
                        value={value}
                        checked={checked}
                        onChange={() => { setOptions(name, value)
                        }} />
                 {/* onChange initializes setOptions with two arguments / Activates change of button*/}

                {/* If true option available then it will hover */}
                <div className={`p-2 my-3 text-lg block cursor-pointer rounded-full
                 mr-3 ${checked ? "text-white bg-gray-900" : "text-gray-900 bg-gray-200"}`}>
                    
                    <span className='px-2'>{value}</span>
                 </div>
                </label>
                )
            }
            )
        }

        </div>
    </fieldset>
  )
}


