import {getProductsInCollection} from '../lib/shopify'
import ProductList from '../components/ProductList'
import Hero from '../components/Hero'
import Head from 'next/head'
import AddOn from '../components/AddOn'


export default function Home({ products }) {
  return (
    <div>
      <Head> 
        <title> UPrintI eCommerce Store</title>
        <meta http-Equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-Equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>
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
      <AddOn/>
      <ProductList products={products}/>
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProductsInCollection()
  return {
    props: {products}, // will be passed to the page component as props
  }
}