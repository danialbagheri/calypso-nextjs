import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTruck} from '@fortawesome/free-solid-svg-icons'

import DispatchTime from '../detail/dispatch-time'
import DirectionOfUse from '../detail/DirectionOfUse'
import ShowPrice from '../detail/price/show-price'
import StarRating from '../StarRating/StarRating'
import ShareButton from 'components/common/shareButton'
import {AddButton} from './addButton'
import {OutOfStock} from './outOfStock'

const ProductDescription = props => {
  const {product, selectedVariant, setVariant} = props

  const handleChange = e => {
    e.preventDefault()
    const selectedProduct = product.variants.find(
      product => product.sku === e.target.value,
    )
    setVariant(selectedProduct)
  }

  return (
    <div className="productDescription col-md-6 col-sm-6 col-xs-12">
      <h1 className="productTitle" itemProp="name">
        {product.name}
      </h1>
      <h3 className="productPrice">{product.sub_title}</h3>
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
      <div
        className="text-lg mb-2"
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
      />
      <DirectionOfUse direction={product.direction_of_use} />

      <div className="top20" />

      {selectedVariant.inventory_quantity > 0 ? (
        <p className="text-sm">
          <span style={{marginRight: '10px'}}>🟢</span> In stock -{' '}
          <DispatchTime />
        </p>
      ) : null}
      <h2 className="productPrice">
        <span>
          <ShowPrice selectedVariant={selectedVariant} />
        </span>
      </h2>
      {selectedVariant.size ? (
        <small>Size: {selectedVariant.size} | </small>
      ) : null}

      {selectedVariant.price_per_100ml ? (
        <small>£{selectedVariant.price_per_100ml} per 100ml</small>
      ) : null}

      <div className="deliveryInfo">
        <FontAwesomeIcon icon={faTruck} className="calypso-orange-text" />
        <div style={{textAlign: 'left'}}>
          Buy 2 or more products for <strong>Free UK Delivery</strong>
          <br />
          <span style={{color: 'grey'}}>Standard UK delivery £3</span>
        </div>
      </div>
      <div className="addToCartContainer">
        {product.variants.length === 1 ? (
          <Typography>{product.variants[0].name}</Typography>
        ) : (
          <select
            className="ProductOptionSelector"
            onChange={e => handleChange(e)}
          >
            {product.variants.map(variant => (
              <option value={variant.sku} key={variant.id}>
                {variant.name}
                {'    '}
                {variant.size}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedVariant.inventory_quantity > 0 ? (
        <AddButton selectedVariant={selectedVariant} product={product} />
      ) : (
        <OutOfStock selectedVariant={selectedVariant} />
      )}

      <div className="ShareButtonOnProductPage">
        <ShareButton />
      </div>
    </div>
  )
}

export default ProductDescription
