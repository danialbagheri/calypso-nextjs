import * as React from 'react'

import {useSearchParams} from 'next/navigation'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function VariantSelector({
  variants,
  selectedVariant,
  setSelectedVariant,
  ...props
}) {
  const searchParams = useSearchParams()

  const urlSku = searchParams.get('sku')

  const isAllVarSPF = variants.every(variant => variant.name.startsWith('SPF'))
  const isSingleVariant = variants.length === 1

  const handleChange = e => {
    e.preventDefault()
    const selectedProduct = variants.find(
      variant => variant.sku === e.target.value,
    )
    setSelectedVariant(selectedProduct)
  }

  const renderVariant = variant => {
    const isInStock = variant.inventory_quantity > 0
    const isSelected = selectedVariant.sku === variant.sku
    const variantName = variant.name.split(' ')[1]

    return (
      <Box
        sx={{
          width: 44,
          height: 44,
          color: '#fff',
          backgroundColor: isInStock ? '#FF6B00' : '#cdcdcd',
          padding: 2,
          borderRadius: '50%',
          border: '1px solid white',
          boxShadow: isSelected ? ' 0 0 0 2px #ff6b00' : 'none',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => {
          setSelectedVariant(variant)
        }}
        textAlign={'center'}
        className={'SPF_variants'}
      >
        {variantName}
      </Box>
    )
  }

  React.useEffect(() => {
    if (urlSku) {
      const variant = variants.find(variant => variant.sku === urlSku)

      if (variant) {
        setSelectedVariant(variant)
      }
    } else {
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i]

        if (variant.inventory_quantity > 0) {
          setSelectedVariant(variant)
          break
        } else if (i === variants.length - 1) {
          setSelectedVariant(variants[0])
        }
      }
    }
  }, [urlSku])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
      }}
      {...props}
      className={'main_variant_selector_con'}
    >
      {isAllVarSPF ? (
        variants.map(variant => renderVariant(variant))
      ) : (
        <>
          {isSingleVariant ? (
            <Typography variant={'h6'}>{variants[0].name}</Typography>
          ) : (
            <select
              className="ProductOptionSelector"
              onChange={e => handleChange(e)}
            >
              {variants.map(variant => (
                <option
                  value={variant.sku}
                  key={variant.id}
                  selected={selectedVariant.sku === variant.sku}
                >
                  {variant.name}
                  {'    '}
                  {variant.size}
                </option>
              ))}
            </select>
          )}
        </>
      )}
    </Box>
  )
}

export default VariantSelector
