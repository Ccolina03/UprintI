
export default async function existing(req, res) {
  const {query: {id}} = req

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

async function getProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
      id
      variants(first: 25) {
        edges {
          node {
            id
            availableForSale
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

const product = await getProduct(id)

res.status(200)
res.json(product)

}
