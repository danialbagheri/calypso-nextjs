import * as React from 'react'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

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
    <Stack direction={{xs: 'column', sm: 'row'}} gap={4} alignItems="flex-end">
      <ProductQuantity
        selectedQuantity={selectedQuantity}
        setQuantity={setSelectedQuantity}
      />
      <Button
        onClick={() => {
          addToBasket(
            selectedVariant.shopify_storefront_variant_id,
            selectedQuantity,
          )
        }}
        sx={{fontWeight: 700}}
        variant="contained"
        fullWidth
      >
        Add to Cart
      </Button>
    </Stack>
  )
}

export default AddButton
