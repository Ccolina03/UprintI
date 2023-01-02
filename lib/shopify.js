
const domain = process.env.SHOPIFY_STORE_DOMAIN

const storefrontAToken= process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

// General Process for any query
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
      //possible errors: no wifi connection or wrong query
        throw new Error('Fail to fetch products. Check query in lib')
    }

}


export async function getSpecificProductUsingIndex() {
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
       
      //if edges exist, then save this short path in AllProduct (to be used later) for node.id, node.title,etc. 
      const product_specific=response.data.collection.products ? 
         response.data.collection.products : []

      return product_specific
  }



//products to appear in HomePage
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
       
      //if edges exist, then save this short path in AllProduct (to be used later) for node.id, node.title,etc. 
      const allProducts=response.data.collection.products.edges ? 
         response.data.collection.products.edges : []

      return allProducts
}

/* Example Output: 
{
  "data": {
    "collection": {
      "title": "Home page",
      "products": {
        "edges": [
          {
            "node": {
              "id": "gid://shopify/Product/8074174955826",
              "title": "Puss in Boots",
              "handle": "puss-in-boots",
              "priceRange": {
                "minVariantPrice": {
                  "amount": "1.0"
                }
              },
              "images": {
                "edges": [
                  {
                    "node": {
                      "url": "https://cdn.shopify.com/s/files/1/0694/7523/8194/products/WhatsAppImage2023-01-01at15.38.32.jpg?v=1672613416",
                      "altText": null
                    }
                  },
                  {
                    "node": {
                      "url": "https://cdn.shopify.com/s/files/1/0694/7523/8194/products/WhatsAppImage2023-01-01at15.38.30.jpg?v=1672613416",
                      "altText": null
                    }
                  },
                  {
                    "node": {
                      "url": "https://cdn.shopify.com/s/files/1/0694/7523/8194/products/WhatsAppImage2023-01-01at15.38.28.jpg?v=1672613416",
                      "altText": null
                    }
                  }
                ]
              }
            }
          },
          {
            "node": {
              "id": "gid://shopify/Product/8061188440370",
              "title": "Player Ready",
              "handle": "player-ready",
              "priceRange": {
                "minVariantPrice": {
                  "amount": "35.0"
                }
              },
*/




//Acessing handle and id to just get the path. Exm: node.handle,etc. PD: handle='player-ready', id="gid://shopify/Product/806118844037
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



/* //Example Output: 

{
  "data": {
    "products": {
      "edges": [
        {
          "node": {
            "handle": "player-ready",
            "id": "gid://shopify/Product/8061188440370"
          }
        }, */







//used for the dynamic pages of products/[product.js]. first use is product.id, product.handle, product.images,etc.23
//second use given is with collections
export async function getProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  images(first: 5) {
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
        }
    	}
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
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
      variants(first: 25) {
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
            availableForSale
            price{
              amount
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query)
  const product = response.data.product ? response.data.product : []
  //allows to specify collection
  return product 
}


export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;


    const response = await ShopifyData(query)
    const checkout = response.data.checkoutCreate.checkout ? response.data.checkoutCreate.checkout : []

    return checkout ;
    }

    export async function updateCheckout(id, lineItems) {//Making query to replace checkout data
      const lineItemsObject = lineItems.map((key) => {
        return `
        {
          variantId: "${key.id}", 
          quantity: ${key.variantQuantity}
        }`;
      });

      const query = `mutation {
        checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
          checkout {
            id
            webUrl
            lineItems(first: 25) {
              edges {
                node {
                  id
                  title
                  quantity
                }
              }
            }
          }
        }
      }`;
    
      const response = await ShopifyData(query);
      console.log(response)

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}
    