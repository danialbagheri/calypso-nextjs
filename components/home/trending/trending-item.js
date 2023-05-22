import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import StarRating from 'components/products/StarRating/StarRating'

export default function TrendingItem(props) {
  const {product} = props
  const [hover, setHover] = React.useState(false)

  const toggleHover = () => {
    setHover(!hover)
  }
  return (
    <div className="trending-item-parent">
      <Link
        href={`/products/${product.slug}`}
        className="trending-box-image"
        onMouseEnter={toggleHover}
      >
        <Image
          src={product.main_image || '/advice/placeholder.png'}
          alt={product.name}
          className={hover ? 'd-none' : 'd-block'}
          fill
          sizes="(max-width: 450px) 150,(max-width: 768px) 262, (max-width: 1200px) 262, 262"
        />
        <Image
          src={product.secondary_image || '/advice/placeholder.png'}
          alt={product.name}
          className={hover ? 'd-block' : 'd-none'}
          fill
          sizes="(max-width: 450px) 150,(max-width: 768px) 262, (max-width: 1200px) 262, 262"
        />
      </Link>
      <div className="trending-box-text">
        <p>
          <strong>{product.name}</strong>
          <br />
          {product.sub_title}
        </p>
        <p className="trending-box-price">
          From £{product.lowest_variant_price}
        </p>

        <div className="trending-star-review-container">
          <StarRating
            name={product.name}
            score={product.review_average_score}
          />
          <div>{product.review_average_score}</div>
        </div>
      </div>
    </div>
  )
}
