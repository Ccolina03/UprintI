import ProductPageContent from '../../components/ProductPageContent'
import {getProduct, getAllProducts} from '../../lib/shopify'

//[product].js refers to /products/${handle}

//getStaticProps gets new in-depth product details from getStaticPaths and is now passed to ProductPage
export default function ProductPage({product}) {
  return (
    <div className='min-h-screen py-12 sm:pt-20'>
      <ProductPageContent product = {product}/>
    </div>
  )
}


//first defined. Getting paths(id and handle) from getAllProducts from index.js
export async function getStaticPaths() {
    const products = await getAllProducts() 
    
    const paths = products.map(item =>{
        const handle = String(item.node.handle) //handle saves for each product their handle

    return {
        params: {product: handle}  //to access handle from params, use params.product, PD: product has to be bc [product].js
    }
    })
    return {
      //what getStaticPath returns: 

      paths: paths,  //now that params.product = handle is saved in paths
      fallback: false
    }
  }


//getStaticProps expects the return of getStaticPaths through params
//wil happen one-by-one, with the path we can now request a bigger specific data for specified product/handle
export async function getStaticProps({params}) {

  //getProduct from shopify.js has a dynamic query
    const product = await getProduct(params.product)

    //now the props will have a more detailed information for each product with new query
    return {
    props: {
        product
    }
    }

}
