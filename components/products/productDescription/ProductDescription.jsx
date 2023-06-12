import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Stack} from '@mui/material'

import {VariantSelector} from 'sharedComponents'
import ShareButton from 'components/common/shareButton'

import DispatchTime from '../detail/dispatch-time'
import ShowPrice from '../detail/price/show-price'
import StarRating from '../StarRating/StarRating'
import {AddButton} from './addButton'
import {OutOfStock} from './outOfStock'
import {ProductTab} from './productTab'
import {VariantSize} from './variantSize'
import {DeliveryInfo} from './deliveryInfo'
import {ProductDropDown} from './productDropDown'

const ProductDescription = props => {
  const {product, selectedVariant, setSelectedVariant} = props

  return (
    <Stack gap={4}>
      <Typography color={'#ff6b00'} variant={'h2'}>
        {product.name}
      </Typography>

      <Typography variant={'h3'}>{product.sub_title}</Typography>

      <Box sx={{display: 'flex', alignItems: 'flex-start', gap: 2, mt: 2}}>
        <StarRating score={product.review_average_score} name={product.name} />
        <a href="#readReviews">
          {product.total_review_count >= 1 ? (
            <span>Read {product.total_review_count} reviews</span>
          ) : (
            <span>Be the first to review to this product</span>
          )}
        </a>
      </Box>
      <Box
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
        sx={{textAlign: 'justify'}}
      />
      <ProductTab product={product} selectedVariant={selectedVariant} />

      {selectedVariant.inventory_quantity > 0 ? (
        <Box mt={10}>
          <span style={{marginRight: '10px'}}>🟢</span> In stock -{' '}
          <DispatchTime />
        </Box>
      ) : null}

      <VariantSize selectedVariant={selectedVariant} />

      <Typography variant="h2" color={'#FF6B00'}>
        <ShowPrice selectedVariant={selectedVariant} />
      </Typography>

      <VariantSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
      />

      {selectedVariant.inventory_quantity > 0 ? (
        <AddButton selectedVariant={selectedVariant} product={product} />
      ) : (
        <OutOfStock selectedVariant={selectedVariant} />
      )}

      {/* <DeliveryInfo /> */}

      <div className="ShareButtonOnProductPage">
        <ShareButton />
      </div>

      <ProductDropDown selectedVariant={selectedVariant} product={product} />
    </Stack>
  )
}

export default ProductDescription
