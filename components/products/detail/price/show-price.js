import React from 'react'
import PriceCss from './price.module.css'

export default function ShowPrice(props) {
  const {selectedVariant} = props

  if (selectedVariant.compare_at_price) {
    // calculate the discount
    const discount =
      (selectedVariant.compare_at_price - selectedVariant.price) /
      selectedVariant.compare_at_price
    const discountPercent = Math.round(discount * 100)
    return (
      <div className="product-price">
        <span className={PriceCss.discountPercent}>-{discountPercent}%</span>
        <span className="product-price-new">£{selectedVariant.price}</span>
        <span className={PriceCss.oldPrice}>
          was: £{selectedVariant.compare_at_price}
        </span>
      </div>
    )
  } else {
    return (
      <div className="product-price">
        <span className="product-price-new">£{selectedVariant.price}</span>
      </div>
    )
  }
}
