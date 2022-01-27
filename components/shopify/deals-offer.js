import { useState, useEffect } from "react";

import DealItem from "./deal-item";

export default function DealOffer(props) {
  const [offerDeal, setOfferDeal] = useState(false);
  const totalPrice = props.totalPrice;

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
  }, [props.totalPrice]);

  return (
    <div className="deal-container">
      {offerDeal ? (
        <div className="Cart-info clearfix">
          <div>
            <strong>DEALS</strong>
            <DealItem />
          </div>
        </div>
      ) : null}
    </div>
  );
}
