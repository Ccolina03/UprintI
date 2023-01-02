import ProductCard from "./ProductCard"


//ProductList is called in Home from index.js
//{products} from GetProductsInCollection from shopify.js

const ProductList = ({products}) => {
  return (
    <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Products 
            </h2>
        {/* Connecting Explore to Products */}
        <div id="second-section" className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"> 
        {
          //Accessing each id as key and product attributes as product and passing to how it is going to be displayed.
        products.map(product => (
            <ProductCard key={product.node.id} product={product}/>
        ))
        }
        </div>
    </div>
  </div>
  )
}

export default ProductList
