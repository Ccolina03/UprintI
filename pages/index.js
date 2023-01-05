import {getProductsInCollection} from '../lib/shopify'
import { getSpecificProductUsingIndex } from '../lib/shopify'
import ProductList from '../components/ProductList'
import Hero from '../components/Hero'
import Head from 'next/head'
import AddOn from '../components/AddOn'

//index.js refers to /

//passing obj-destr. {products} as props from getStaticProps
export default function Home({ products, product_specific}) {
  return (
    <div>
      <Head> 
        <title> UPrintI eCommerce Store</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
        <meta name="description" content='Ecommerce store created with Next.js, TailwindCSS, GraphQL and Shopify with primary mission to help my mom sell our childhood toys 
        and get a future revenue to fund our education. Addtional functionalities would be facilitating entrepreneurships to display and sell their products and services' />
        <meta property="og:title" content="UPrinti eCommerce Store" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://uprint-i.vercel.app/" />
        <meta property="og:image" content="https://uprint-i.vercel.app/images/costaverde.jpg" />
        <meta property="og:description" 
  content='Ecommerce store created with Next.js, TailwindCSS, GraphQL and Shopify with primary mission to help my mom sell our childhood toys 
  and get a future revenue to fund our education. Addtional functionalities would be facilitating entrepreneurships to display and sell their products and services' />
     <meta property="og:locale" content="en_US" />
     <meta property="og:site_name" content="UPrintI eCommerce Store" />

      </Head>
      <Hero/>
      <AddOn product_specific={product_specific}/>
      <ProductList products={products}/> 
    </div>
  )
}
//ProductList gets the props from products as products

export async function getStaticProps() { 
  const products = await getProductsInCollection() 
  const product_specific = await getSpecificProductUsingIndex()
  //getting products = response.data.collection.products.edges
  return {
    props: {products, product_specific}, // will be passed to the page component as props
  }
}