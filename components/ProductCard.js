import Link from 'next/link'
import Image from 'next/image'
import { formatter } from '../utils/helpers'



//ProductCard is called in ProductList. 
//{product} changes because of mapping (specific attributes for each product)

const ProductCard = ({product}) => {
    const {handle, title} = product.node //accesing handle = title(no caps) Ex: panda-po = Panda Po
    const {altText, url} = product.node.images.edges[0].node //choosing first image
   
    //specific price from mapping in ProductList
   const price = product.node.priceRange.minVariantPrice.amount


   //Employing Link to allow future access to new page for each Product
   //this return will be visible in Home from index.js
    return (
        <Link href={`/products/${handle}`}>
        <a className='group'>
        <div className='2-full bg-gray-200 rounded-3xl overflow-hidden'>
            <div className='relative group-hover:opacity-75 h-72'>
                <Image src={url}
                alt={altText}
                layout="fill"
                objectFit="cover"/>
            </div>
            </div>

        <h3 className='mt-4 text-lg font-medium text-gray-900'>
            {title}
        </h3>
        <p className='mt-1 text-sm text-gray-700'>{formatter.format(price)}</p>
        
        </a>
        </Link>
      
  )
}



export default ProductCard
