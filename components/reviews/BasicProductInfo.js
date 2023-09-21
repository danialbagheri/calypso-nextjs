import ReviewClass from './Review.module.css'

export default function BasicProductInfo(props) {
  const product = props.product
  return (
    <div className={ReviewClass.BasicProductInfoContainer}>
      <h1 className={ReviewClass.BasicProductInfoContainerTitle}>
        Your {product.name} review
      </h1>
      <div className={ReviewClass.BasicProductInfoImageContainer}>
        <img alt={product.name} src={product.main_image} />
      </div>
    </div>
  )
}
