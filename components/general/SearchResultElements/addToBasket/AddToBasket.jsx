import {useShopify} from 'components/hooks'

import style from './AddToBasket.module.css'

function AddToBasket(props) {
  const {addVariant, checkoutState, openCart} = useShopify()

  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ]
    addVariant(checkoutState.id, lineItemsToAdd)
      .then(() => openCart())
      .catch(err => console.log(err))
  }

  return (
    <div className={style.container}>
      <button
        className={style.addToCartBtn}
        onClick={() => {
          addToBasket(props.variantId, props.quantity)
        }}
      >
        ADD TO CART
      </button>
    </div>
  )
}

export default AddToBasket
