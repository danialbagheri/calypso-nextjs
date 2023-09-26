import {useEffect, useState} from 'react'
import DealItem from './deal-item'
import LinearProgress from '@mui/material/LinearProgress'

export default function DealOffer(props) {
  const [offerDeal, setOfferDeal] = useState(false)
  const [remainingAmount, setRemainingAmount] = useState(0)
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
    if (checkoutState.totalPrice && checkoutState.totalPrice.amount < 25) {
      const remainingAmount = 25 - parseFloat(checkoutState.totalPrice.amount)
      setRemainingAmount(remainingAmount.toFixed(2))
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
          <LinearProgress
            color="primary"
            sx={{mb: 3}}
            value={100 - remainingAmount * 4}
            variant="determinate"
          />
          Spend £{remainingAmount} more to be eligible for{' '}
          <strong>FREE shipping</strong>
        </div>
      ) : (
        <div className="Cart-info clearfix calypso-orange">
          <LinearProgress
            color="primary"
            sx={{mb: 3}}
            value={100}
            variant="determinate"
          />
          You have got free shipping! 🧡 🎉
        </div>
      )}
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
