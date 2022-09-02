import React, {useState, useEffect} from 'react'
import ShareButton from '../common/shareButton'
import {useShopify} from '../hooks'
import StarRatingCustom from '../common/star-rating-custom'
import * as ga from '../common/googleAnalytics'
import ProductQuantity from './detail/product-quantity'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTruck} from '@fortawesome/free-solid-svg-icons'
import DispatchTime from './detail/dispatch-time'
import DirectionOfUse from './detail/DirectionOfUse'
import ShowPrice from './detail/price/show-price'

export default function ProductDescription(props) {
  const product = props.product
  const selectedVariant = props.selectedVariant
  const {addVariant, checkoutState, openCart} = useShopify()
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  // const [price, setPrice] = useState(props.price);

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
          product: props.productName,
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
    <div className="productDescription">
      <h1 className="productTitle" itemProp="name">
        {product.name}
      </h1>
      <h3 className="productPrice">{product.sub_title}</h3>
      <div className="review-count-product-description">
        <div className="star-rating">
          <StarRatingCustom
            name={product.name}
            // className="star-rating"
            value={product.review_average_score}
            halfStarSize={'2rem'}
          />
        </div>
        <a href="#readReviews" className="read-reviews">
          {product.total_review_count >= 1 ? (
            <span>Read {product.total_review_count} reviews</span>
          ) : (
            <span>Be the first to review to this product</span>
          )}
        </a>
      </div>
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
          <span style={{marginRight: '10px'}}>🟢</span> In stock - <DispatchTime />
        </p>
      ) : null}
      <h2 className="productPrice">
        <span>
          <ShowPrice selectedVariant={selectedVariant} />
        </span>
      </h2>
      {selectedVariant.size ? <small>Size: {selectedVariant.size} | </small> : null}

      {selectedVariant.price_per_100ml ? <small>£{selectedVariant.price_per_100ml} per 100ml</small> : null}

      <div className="deliveryInfo">
        <FontAwesomeIcon icon={faTruck} className="calypso-orange-text" />
        <div style={{textAlign: 'left'}}>
          Buy 2 or more products for <strong>Free UK Delivery</strong>
          <br />
          <span style={{color: 'grey'}}>Standard UK delivery £3</span>
        </div>
      </div>
      <div className="addToCartContainer">{props.child}</div>

      <div className="addToCartContainer">
        <ProductQuantity selectedQuantity={selectedQuantity} setQuantity={setSelectedQuantity} />
        <button
          className={selectedVariant.inventory_quantity > 0 ? 'addToCart' : 'addToCartDisabed'}
          onClick={() => {
            addToBasket(selectedVariant.shopify_storefront_variant_id, selectedQuantity)
          }}
          disabled={selectedVariant.inventory_quantity > 0 ? false : true}
        >
          {selectedVariant.inventory_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>

      <div className="ShareButtonOnProductPage">
        <ShareButton />
      </div>
    </div>
  )
}
