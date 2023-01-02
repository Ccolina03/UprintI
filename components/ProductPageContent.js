import Image from "next/dist/client/image"
import ProductForm from "./ProductForm"
import SwiperCore, {Navigation, Pagination} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import RecommendedList from "./RecommendedList"

//This is the visible content of /products/${handle}
//ProductPageContent is called in [product.js] with the in-depth details of specific product 

export default function ProductPageContent({product}) {

    const images = []
    //Adding Swiping functionality to any image quantity in the database. 
    //Saving each image in images array.
    product.images.edges.map((image, i) => {
        images.push(
            <SwiperSlide key={`slide-${i}`}>
                <Image src= {image.node.url} alt={image.node.altText} layout='fill' objectFit="cover"/>
            </SwiperSlide>
        )
    })

    SwiperCore.use([Navigation, Pagination])
    
    //Three sections: Image, Product Forms (options, variants,etc) and Recommended Selection
return (
        <div>

         <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto ">
            <div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
                <div className="relative h-96 w-full">
                   <Swiper
                   style={{'--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000'}}
                   navigation
                   pagination={{clickable: true}}
                   className="h-96 rounded-2xl"
                   loop='true'
                   >
                    {images}
                   </Swiper>
                </div>
            </div>
            <ProductForm product={product} />
        </div>
            <p className="w-11/12 max-w-3xl pt-16 mx-auto space-y-8 md:space-x-4 lg:space-x-8">{product.description}</p>
            <RecommendedList current={product.id} products={product.collections.edges[0].node.products.edges}/>
        </div>
    )
}