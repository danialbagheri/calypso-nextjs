import { useState, useEffect } from "react";
import _ from "lodash";
import DealItem from "./deal-item";
import LipBalmDeal from "./lipbalm-deal";

export default function DealOffer(props) {
  const [offerDeal, setOfferDeal] = useState(false);
  const [offerLipBalm, setOfferLipBalm] = useState(false);
  const totalPrice = props.checkoutState.totalPrice;
  const checkoutState = props.checkoutState;

  const checkLipBalmDeal = () => {
    const lineItems = checkoutState.lineItems;

    function verifySku(n) {
      console.log(n.variant.sku);
      return n.variant.sku.startsWith("CALB");
    }
    const result = _.map(lineItems, verifySku);
    const containSanitiser = _.pullAll(result, [false]);
    if (lineItems && lineItems.length == containSanitiser.length) {
      setOfferLipBalm(false);
      console.log("There is only sanitiser in the basket");
    } else {
      setOfferLipBalm(true);
    }
  };

  const checkSanitiserDeal = () => {
    const minTotalPriceCondition = 5;
    if (totalPrice > minTotalPriceCondition) {
      setOfferDeal(true);
    } else {
      setOfferDeal(false);
    }
  };

  useEffect(() => {
    checkSanitiserDeal();
    checkLipBalmDeal();
  }, [props.checkoutState]);

  return (
    <div className="deal-container">
      {offerDeal || offerLipBalm ? (
        <div className="Cart-info clearfix">
          <div>
            <strong>DEALS</strong>
            <div>
              <small>You are eligible for the following deals</small>
            </div>
            {offerDeal && <DealItem />}
            {offerLipBalm && <LipBalmDeal />}
          </div>
        </div>
      ) : null}
    </div>
  );
}
