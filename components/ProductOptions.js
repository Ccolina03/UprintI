import React from 'react'

export default function ProductOptions({name, values, selectedOptions, setOptions}) {
  return (
    <fieldset className='mt-3'>
        <legend className='text-xl font-semibold'>
            {name}
        </legend>
        <div className='inline-flex flex-wrap items-center'>
        {
            values.map(value => {
                
                const id = `option-${name}-${value}`
                const checked = selectedOptions[name] === value
            
                return (
                    <label key={id} htmlFor={id}>
                        <input className='sr-only'
                        type='radio'
                        id={id}
                        name={`option-${name}`}
                        value={value}
                        checked={checked}
                        onChange={() => { setOptions(name, value)
                        }} />
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


