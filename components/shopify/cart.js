import React, {useEffect} from 'react'
import LineItem from './lineItem'
import {useShopify} from '../hooks'
import DealOffer from './deals-offer'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import * as ga from '../common/googleAnalytics'

export default function Cart() {
  const [discountItem, setDiscountItem] = React.useState({
    title: '',
    percentage: '',
  })
  const {
    cartStatus,
    closeCart,
    openCart,
    checkoutState,
    setCount,
    // fetchProductByQuery,
  } = useShopify()

  function handleOpen(e) {
    e.preventDefault()
    openCart()
  }

  function handleClose(e) {
    e.preventDefault()
    closeCart()
  }

  function openCheckout(e) {
    e.preventDefault()
    // window.open(checkoutState.webUrl) // opens checkout in a new window
    const itemsInBasket = checkoutState.lineItems.map(item => {
      return {
        id: item.variant.sku,
        name: item.title,
        variant: item.variant.title,
        quantity: item.quantity,
        price: item.variant.price.amount,
      }
    })
    ga.event({
      action: 'begin_checkout',
      params: [
        {
          items: itemsInBasket,
        },
      ],
    })
    window.location.replace(checkoutState.webUrl) // opens checkout in same window
  }

  function applyDiscountApplication(checkoutState) {
    try {
      if (checkoutState && checkoutState.discountApplications.length >= 1) {
        // checkoutState.discountApplications.map(item => {
        //   setDiscountItem({
        //     title: item.title,
        //     percentage: item.value.percentage,
        //   })
        // })
      } else {
        setDiscountItem({
          title: '',
          percentage: '',
        })
      }
    } catch (error) {
      setDiscountItem({title: '', percentage: ''})
    }
  }

  useEffect(() => {
    applyDiscountApplication(checkoutState)
  }, [checkoutState])

  useEffect(() => {
    const button = document.querySelector('button.App__view-cart')
    if (cartStatus === true) {
      button.classList.add('hide')
    } else {
      button.classList.remove('hide')
    }

    function getCount() {
      const lineItems =
        checkoutState.lineItems && checkoutState.lineItems.length > 0
          ? checkoutState.lineItems
          : []
      let count = 0
      lineItems.forEach(item => {
        count += item.quantity
        return count
      })

      setCount(count)
    }

    getCount()
  }, [cartStatus, checkoutState])

  return (
    <div id="cart">
      <div className={`Cart ${cartStatus ? 'Cart--open' : ''}`}>
        <div className="App__view-cart-wrapper2">
          <button className="App__view-cart" onClick={e => handleOpen(e)}>
            ×
          </button>
        </div>
        <header className="Cart__header">
          <h2>Your cart</h2>
          <button className="Cart__close" onClick={e => handleClose(e)}>
            ×
          </button>
        </header>
        <ul className="Cart__line-items">
          <LineItem />
        </ul>
        <footer className="Cart__footer">
          <DealOffer checkoutState={checkoutState} />

          {discountItem.title.length > 0 ? (
            <div className="Cart-info clearfix cart__discount__code">
              <FontAwesomeIcon
                className="discount__code__icon"
                icon={faCheckCircle}
              />
              <div className=" Cart-info__small">
                Automatic discount applied: <br />
                <span
                  style={{
                    fontSize: '1.3rem',
                  }}
                >
                  {discountItem.title}
                </span>
              </div>
            </div>
          ) : null}

          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Total</div>
            <div className="Cart-info__pricing">
              <span className="pricing">
                £ {checkoutState?.totalPrice?.amount}
              </span>
            </div>
          </div>
          <button
            className="Cart__checkout button"
            onClick={e => openCheckout(e)}
          >
            Checkout
          </button>
        </footer>
      </div>
    </div>
  )
}
