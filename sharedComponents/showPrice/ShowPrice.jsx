import React from 'react'
import PriceCss from './price.module.css'

export default function ShowPrice(props) {
  const {selectedVariant} = props
  const [currency, setCurrency] = React.useState('GBP')

  const priceGenerator = () => {
    if (currency === 'EUR') {
      return `€${selectedVariant.euro_price}`
    }
    return `£${selectedVariant.price}`
  }

  const compareAtPriceGenerator = () => {
    if (currency === 'EUR') {
      return `€${selectedVariant.euro_compare_at_price}`
    }
    return `£${selectedVariant.compare_at_price}`
  }

  React.useEffect(() => {
    if (localStorage.getItem('currency')) {
      setCurrency(localStorage.getItem('currency'))
    } else {
      // TODO::: BACKEND api needs updating
      // fetch('https://service.calypsosun.com/api/users/ips/92.239.204.4/locations/')
      //   .then(res => res.json())
      //   .then(response => {
      //     localStorage.setItem('currency', response.currency)
      //     setCurrency(response.currency)
      //   })
      //   .catch(() => {
      //     console.error('IP-API Request failed')
      //   })
    }
  }, [])

  if (selectedVariant.compare_at_price) {
    // calculate the discount
    const discount =
      (selectedVariant.compare_at_price - selectedVariant.price) /
      selectedVariant.compare_at_price
    const discountPercent = Math.round(discount * 100)
    return (
      <div className="product-price">
        <span className={PriceCss.discountPercent}>-{discountPercent}%</span>
        <span className="product-price-new">{priceGenerator()}</span>
        <span className={PriceCss.oldPrice}>
          was: {compareAtPriceGenerator()}
        </span>
      </div>
    )
  }
  return (
    <div className="product-price">
      <span className="product-price-new">{priceGenerator()}</span>
    </div>
  )
}
