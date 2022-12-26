
const domain = process.env.SHOPIFY_STORE_DOMAIN

const storefrontAToken= process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN


async function ShopifyData(query) {
    const url = `https://${domain}/api/2022-10/graphql.json`;

    const options = {
        endpoint: url, 
        method: 'POST',
        headers: {
            'X-Shopify-Storefront-Access-Token': storefrontAToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query})
    }

    try {
        const data = await fetch (url, options).then(response => {
           return response.json()
        })
        return data
    } catch (error) {
        console.error(error)
        throw new Error('Fail to fetch products. Check query in lib')
    }

}

export async function getProductsInCollection() {
    const query = `{
      collection (handle: "frontpage") {
        title
        products(first: 25) {
          edges{
            node{
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first:5){
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
        
      }
    }`

      const response = await ShopifyData(query) 
       
      const allProducts=response.data.collection.products.edges ? 
         response.data.collection.products.edges : []

      return allProducts
}


export async function getAllProducts() {
  const query = `{products (first:25) {
    edges {
    node {
      handle
      id
      }
    }
  }
    
  }`
  const response = await ShopifyData(query)

  const pathproduct = response.data.products.edges ? response.data.products.edges: []
  return pathproduct
}


export async function getProduct(handle) {
  const query = 
  `{product (handle: "${handle}") {
    id
    title
    handle
    description
    images(first: 5) {
      edges {
        node{
          url
          altText
        }
      }
    }
    options {
      name 
      values
      id
    }
    variants(first:25) {
      edges {
        node {
          selectedOptions {
            name
            value
          }
          image {
            url 
            altText
          }
          title 
          id 
          price {
            amount
          }
        }
      }
    }
  }}
  `

  const response = await ShopifyData(query)
  const product = response.data.product ? response.data.product : []

  return product 
}


export async function creatutnueCheckout(id, quantity) {
  const query=`mutation {
    checkoutCreate(input: {
      lineItems[{variantId: "${id}", quantity: ${quantity}}]
    })
    {
      checkout {
        id 
        webUrl
      }
    }`

    const response = await ShopifyData(query)
    const checkout = response.data.createCheckout.checkout ? response.data.createCheckout.checkout : []

    return checkout 
    }

    export async function updateCheckout(id, lineItems) {
      const lineItemsObject = lineItems.map(key => {
        return `
        {
          variantId: "${key.id}", 
          quantity: ${key.variantQuantity}
        }`
      })

      const query = `checkoutLineItemsReplace(lineItems: [], checkoutId: "") {
        checkout {
          id
          webUrl
        }
      }
      }`
      const response = await ShopifyData(query)

      const checkout = response.data.checkoutLineItemsReplace.checkout ? response.data.checkoutLineItemsReplace.checkout : []
      return checkout 
    }