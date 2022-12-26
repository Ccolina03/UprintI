import ProductPageContent from '../../components/ProductPageContent'
import {getProduct, getAllProducts} from '../../lib/shopify'

export default function ProductPage({product}) {
  return (
    <div className='min-h-screen py-12 sm:pt-20'>
      <ProductPageContent product = {product}/>
    </div>
  )
}

export async function getStaticPaths() {
    const products = await getAllProducts()

    const paths = products.map(item =>{
        const handle = String(item.node.handle)

    return {
        params: {product: handle}
    }
    })
    return {
      paths: paths,
      fallback: false
    }
  }



export async function getStaticProps({params}) {
    const product = await getProduct(params.product)

    return {
    props: {
        product
    }
    }

}