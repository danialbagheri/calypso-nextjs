import * as React from 'react'

import {Box, Typography, useTheme} from '@mui/material'

export default function ShowPrice(props) {
  const {selectedVariant} = props
  const [currency, setCurrency] = React.useState('GBP')
  const theme = useTheme()
  const hasDiscount = Boolean(selectedVariant.compare_at_price)

  const renderDiscount = () => {
    if (hasDiscount) {
      const discount =
        (selectedVariant.compare_at_price - selectedVariant.price) /
        selectedVariant.compare_at_price
      const discountPercent = Math.round(discount * 100)
      return `-${discountPercent}%`
    }
    return null
  }
  const compareAtPriceGenerator = () => {
    if (currency === 'EUR') {
      return `€${selectedVariant.euro_compare_at_price}`
    }
    return `£${selectedVariant.compare_at_price}`
  }
  const priceGenerator = () => {
    if (currency === 'EUR') {
      return `€${selectedVariant.euro_price}`
    }
    return `£${selectedVariant.price}`
  }

  const discount = renderDiscount()
  const compareAtPrice = compareAtPriceGenerator()

  React.useEffect(() => {
    if (localStorage.getItem('currency')) {
      setCurrency(localStorage.getItem('currency'))
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '18px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 3,

          p: '9px 22px',

          bgcolor: theme.palette.primary.light,

          borderRadius: '6px',
        }}
      >
        <Typography color="primary" fontSize={36} fontWeight={700}>
          {priceGenerator()}
        </Typography>
        {hasDiscount ? (
          <Typography color="primary" fontSize={21} fontWeight={400}>
            {discount}
          </Typography>
        ) : null}
      </Box>
      {hasDiscount ? (
        <Typography
          sx={{
            fontSize: '21px',
            fontWeight: 500,
            color: '#CDC3BD',
            textDecoration: 'line-through',
          }}
        >
          {compareAtPrice}
        </Typography>
      ) : null}
    </Box>
  )
}
