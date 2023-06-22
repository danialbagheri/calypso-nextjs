import {useShopify} from '../hooks'

export default function LineItem() {
  const {checkoutState, updateQuantity, removeLineItem} = useShopify()

  function decrementQuantity(lineItemId, lineItemQuantity, e) {
    e.preventDefault()
    const checkoutId = checkoutState.id
    const updatedQuantity = lineItemQuantity - 1
    updateQuantity(lineItemId, updatedQuantity, checkoutId)
  }

  function incrementQuantity(lineItemId, lineItemQuantity, e) {
    e.preventDefault()
    const checkoutId = checkoutState.id
    const updatedQuantity = lineItemQuantity + 1
    updateQuantity(lineItemId, updatedQuantity, checkoutId)
  }

  function deleteLineItem(lineItemId, e) {
    e.preventDefault()
    const checkoutId = checkoutState.id
    removeLineItem(checkoutId, lineItemId)
  }

  return (
    <li className="Line-item">
      {checkoutState.lineItems &&
        checkoutState.lineItems.map((lineItem, i) => {
          return (
            <div className="lineItemDiv" key={`${lineItem.title}` + i}>
              <div className="Line-item__img">
                {lineItem.variant.image ? (
                  <img
                    alt={`${lineItem.title} product shot`}
                    src={lineItem.variant.image.src}
                  />
                ) : null}
              </div>
              <div className="Line-item__content">
                <div className="Line-item__content-row">
                  <span className="Line-item__title">{lineItem.title}</span>
                  <div className="Line-item__variant-title calypso-orange-text">
                    {lineItem.variant.title}
                  </div>
                </div>
                <div className="Line-item__content-row">
                  <div className="Line-item__quantity-container">
                    <button
                      className="Line-item__quantity-update"
                      onClick={e =>
                        decrementQuantity(lineItem.id, lineItem.quantity, e)
                      }
                    >
                      -
                    </button>
                    <span className="Line-item__quantity">
                      {lineItem.quantity}
                    </span>
                    <button
                      className="Line-item__quantity-update"
                      onClick={e => {
                        incrementQuantity(lineItem.id, lineItem.quantity, e)
                      }}
                    >
                      +
                    </button>
                  </div>
                  <span className="Line-item__price">
                    {(
                      lineItem.quantity * lineItem.variant.price.amount
                    ).toFixed(2)}
                  </span>
                  <button
                    className="Line-item__remove"
                    onClick={e => deleteLineItem(lineItem.id, e)}
                  >
                    ×
                  </button>
                </div>
              </div>
              <hr />
            </div>
          )
        })}
    </li>
  )
}
