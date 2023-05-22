import {useState} from 'react'
import _ from 'lodash'
import {Typography} from '@mui/material'
import Link from 'next/link'
import Styles from '../../../styles/bestseller.module.css'
import AddToBasketWithDropDown from '../../products/detail/add-to-basket-with-dropdown'
import ShowPrice from '../../products/product-range/price/show-price'
import StarRating from 'components/products/StarRating/StarRating'

export default function BestSellerItems(props) {
  const i = props.item.item
  const [showButton, setShowButton] = useState(false)
  const [activeVariant, setActiveVariant] = useState(i.variants[0])
  const showBox = () => setShowButton(!showButton)

  return (
    <div
      key={i.id}
      onMouseEnter={showBox}
      onMouseLeave={showBox}
      className={Styles.collectionItem}
    >
      <Link href={`/products/${i.slug}`}>
        <div className={Styles.starRating}>
          <Typography variant="body2">
            <StarRating name={i.name} score={i.review_average_score} />
          </Typography>
        </div>
        {showButton ? (
          <div className={Styles.lifeStylePicture}>
            <picture>
              <img src={i.secondary_image_resized} alt={i.name} />
            </picture>
          </div>
        ) : (
          <div className={Styles.itemPicture}>
            <picture>
              <img src={i.main_image_resized} alt={i.name} />
            </picture>
          </div>
        )}
      </Link>
      <div className={Styles.itemBody}>
        <h6 className={Styles.subTitle}>{i.name}</h6>
        <p className={Styles.subTitle}>
          {i.sub_title} {i.variants[0].name}
        </p>
        <div className={Styles.itemPrice}>
          <strong>
            <ShowPrice selectedVariant={activeVariant} />
          </strong>
        </div>
        <div className={Styles.buttonContainer}>
          <AddToBasketWithDropDown
            product={i}
            activeVariant={activeVariant}
            setActiveVariant={setActiveVariant}
            customContainerStyle={Styles.addToBasketWithDropDown}
          />
        </div>
      </div>
    </div>
  )
}
