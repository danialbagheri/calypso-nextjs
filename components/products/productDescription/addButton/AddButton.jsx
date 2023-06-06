import * as React from 'react'

import {useShopify} from '../../../hooks'

import * as ga from '../../../common/googleAnalytics'
import ProductQuantity from '../../detail/product-quantity'

function AddButton(props) {
  const {selectedVariant, product} = props

  const {addVariant, checkoutState, openCart} = useShopify()
  const [selectedQuantity, setSelectedQuantity] = React.useState(1)

  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ]
    addVariant(checkoutState.id, lineItemsToAdd)
    openCart()
    ga.event({
      action: 'add_to_cart',
      params: [
        {
          product: product.name,
          item: [
            {
              id: selectedVariant.sku,
              name: product.name,
              price: selectedVariant.price,
              brand: 'Calypso',
              variant: selectedVariant.name,
            },
          ],
        },
      ],
    })
    setSelectedQuantity(1)
  }
  return (
    <div className="addToCartContainer">
      <ProductQuantity
        selectedQuantity={selectedQuantity}
        setQuantity={setSelectedQuantity}
      />
      <button
        className={'addToCart'}
        onClick={() => {
          addToBasket(
            selectedVariant.shopify_storefront_variant_id,
            selectedQuantity,
          )
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default AddButton
