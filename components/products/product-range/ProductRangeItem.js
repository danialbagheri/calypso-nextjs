import {useState} from 'react'
import Link from 'next/link'

import AddToBasketWithDropDown from '../detail/add-to-basket-with-dropdown'
import ShowPrice from './price/show-price'
import StarRating from '../StarRating/StarRating'

export default function ProductRangeItem(props) {
  const {product} = props
  const [activeVariant, setActiveVariant] = useState(product.variants[0])

  return (
    <div
      key={product.id}
      className="col-md-3 col-sm-6 col-xs-12 col-lg-3 col-6 productPageSingle"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="productPageImageHolder">
          {product.collection_names.length > 0 ? (
            <div className="productBadge">{product.collection_names[0]}</div>
          ) : null}

          <img
            className="ProductPageImage"
            src={
              activeVariant.image_list[0]
                ? activeVariant.image_list[0].image
                : product.main_image
            }
            alt={product.name}
          />
        </div>
        <div className="text-left-align">
          <p className="productPageTitle">{product.name}</p>
          <p className="mt-0 mb-0">
            <small>{product.sub_title}</small>
          </p>
          <div style={{marginTop: '0.5rem'}} className="mb-0 float-right">
            <StarRating
              name={product.name}
              score={product.review_average_score}
            />
          </div>
          <hr className="m-0" />
          <div className="mt-0 d-flex">
            <div>
              <ShowPrice selectedVariant={activeVariant} />
            </div>
          </div>
        </div>
      </Link>
      <AddToBasketWithDropDown
        product={product}
        activeVariant={activeVariant}
        setActiveVariant={setActiveVariant}
      />
    </div>
  )
}
