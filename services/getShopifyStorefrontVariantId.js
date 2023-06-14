const getShopifyStorefrontVariantId = async () => {
  //  use this function to get shopify storefront varinat ID for the backend look under varinats for the varinat ID
  const query = {
    query: 'variant:[slug:CALD50SCA]',
  }
  const f = await fetchProductByQuery(query)
}
