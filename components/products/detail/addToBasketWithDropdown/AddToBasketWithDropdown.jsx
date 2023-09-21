import {useShopify} from '../../../hooks'
import {Box, Button, useTheme} from '@mui/material'
import {VariantSelector} from 'sharedComponents'

export default function AddToBasketWithDropDown(props) {
  const {addVariant, checkoutState, openCart} = useShopify()
  const theme = useTheme()
  const {activeVariant, setActiveVariant} = props
  const variants = props.product.variants

  const inStock = (variant = false) => {
    if (!variant) {
      if (activeVariant.inventory_quantity > 0) {
        return true
      }
      return false
    }
    if (variant.inventory_quantity > 0) {
      return true
    }
    return false
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
        selectedVariant={activeVariant}
        setSelectedVariant={setActiveVariant}
        variants={variants}
      />
      <Button
        color={'darkGrey'}
        disabled={!inStock()}
        fullWidth
        onClick={() => {
          addToBasket(activeVariant.graphql_id, 1)
        }}
        sx={{
          fontWeight: 700,
          '&:hover': {
            // backgroundColor: theme.palette.sand.main,
            boxShadow: `0 0 2px 1px ${theme.palette.primary.main}`,
            borderColor: 'transparent',
          },
        }}
        variant="outlined"
      >
        {inStock() ? 'ADD TO CART' : 'OUT OF STOCK'}
      </Button>
    </Box>
  )
}
