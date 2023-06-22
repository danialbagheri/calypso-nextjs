import {useEffect, useState} from 'react'
import _ from 'lodash'
import DealItem from './deal-item'

export default function DealOffer(props) {
  const [offerDeal, setOfferDeal] = useState(false)
  const [remindFreeDelivery, setRemindFreeDelivery] = useState(false)
  const [offerLipBalm] = useState(false)
  const totalPrice = props.checkoutState.totalPrice
  const checkoutState = props.checkoutState

  // const checkLipBalmDeal = () => {
  //   const lineItems = checkoutState.lineItems

  //   function verifySku(n) {
  //     return n.variant.sku.startsWith('CALB')
  //   }
  //   const result = _.map(lineItems, verifySku)
  //   const containSanitiser = _.pullAll(result, [false])
  //   if (lineItems && lineItems.length == containSanitiser.length) {
  //     setOfferLipBalm(false)
  //     console.log('There is only sanitiser in the basket')
  //   } else {
  //     setOfferLipBalm(true)
  //   }
  // }

  const checkFreeDeliveryEligibility = () => {
    const lineItems = checkoutState.lineItems
    function lineItemQuantity(n) {
      return n.quantity
    }
    const itemsInBasket = _.map(lineItems, lineItemQuantity)
    const sum = itemsInBasket.reduce((partialSum, a) => partialSum + a, 0)
    if (lineItems && sum == 1) {
      setRemindFreeDelivery(true)
    } else {
      setRemindFreeDelivery(false)
    }
  }

  const checkSanitiserDeal = () => {
    const minTotalPriceCondition = 5
    if (totalPrice > minTotalPriceCondition) {
      setOfferDeal(true)
    } else {
      setOfferDeal(false)
    }
  }

  useEffect(() => {
    checkSanitiserDeal()
    checkFreeDeliveryEligibility()
  }, [props.checkoutState])

  return (
    <>
      {remindFreeDelivery ? (
        <div className="Cart-info clearfix calypso-orange">
          Add one more item to your basket to be eligible for{' '}
          <strong>FREE delivery</strong>
        </div>
      ) : null}
      <div className="deal-container">
        {offerDeal || offerLipBalm ? (
          <div className="Cart-info clearfix">
            <div>
              <strong>DEALS</strong>
              <div>
                <small>You are eligible for the following deals</small>
              </div>
              {offerDeal && <DealItem />}
              {/* {offerLipBalm && <LipBalmDeal />} */}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
