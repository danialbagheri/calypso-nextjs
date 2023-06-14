import _ from 'lodash'
import {useShopify} from '../../../hooks'
import {Box, Button} from '@mui/material'
import {VariantSelector} from 'sharedComponents'

export default function AddToBasketWithDropDown(props) {
  const {addVariant, checkoutState, openCart} = useShopify()
  const {activeVariant, setActiveVariant} = props
  const variants = props.product.variants

  const inStock = (variant = false) => {
    if (!variant) {
      if (activeVariant.inventory_quantity > 0) {
        return true
      } else {
        return false
      }
    } else {
      if (variant.inventory_quantity > 0) {
        return true
      } else {
        return false
      }
    }
  }

  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ]
    addVariant(checkoutState.id, lineItemsToAdd)
    openCart()
  }

  return (
    <Box
      sx={{
        /* ------------------------- Variant selector Styles ------------------------ */
        '& .main_variant_selector_con': {
          minHeight: 50,
          marginBottom: 2,
          gap: {xs: 5, sm: 4},
        },
        '& .SPF_variants': {
          width: 30,
          height: 30,
          fontSize: 12,
        },
        '& .ProductOptionSelector': {
          width: '100%',
          height: '32px',
          padding: '2px 15px',
        },
        /* -------------------------------------------------------------------------- */
      }}
    >
      <VariantSelector
        variants={variants}
        selectedVariant={activeVariant}
        setSelectedVariant={setActiveVariant}
      />
      <Button
        onClick={() => {
          addToBasket(activeVariant.shopify_storefront_variant_id, 1)
        }}
        disabled={!inStock()}
        variant="outlined"
        fullWidth
        sx={{
          fontWeight: 700,
        }}
      >
        {inStock() ? 'ADD TO CART' : 'OUT OF STOCK'}
      </Button>
    </Box>
  )
}
