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
    <Stack alignItems="center" direction={'row'} gap={4}>
      <ProductQuantity
        selectedQuantity={selectedQuantity}
        setQuantity={setSelectedQuantity}
      />

      <Button
        fullWidth
        onClick={() => {
          addToBasket(selectedVariant.graphql_id, selectedQuantity)
        }}
        size="large"
        sx={{
          fontWeight: 700,
          color: 'white',
          borderRadius: '10px',
          '&:hover': {backgroundColor: '#ff6b00'},
          height: '52px',
          boxShadow: 'none',
        }}
        variant="contained"
      >
        Add to Cart
      </Button>
    </Stack>
  )
}

export default AddButton
