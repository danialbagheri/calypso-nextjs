import { useEffect, useState } from "react";
import { useShopify } from "../hooks";

export default function DealItem() {
  const [product, setProduct] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const { fetchProductByQuery, addVariant, checkoutState } = useShopify();

  useEffect(() => {
    const query = {
      query: `product:[id:6783989088393]`,
    };

    const f = fetchProductByQuery(query);
    f.then((f) => {
      setProduct(f[0]);
      setLoaded(true);
    });
  }, []);

  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    addVariant(checkoutState.id, lineItemsToAdd);
  }
  return (
    <div>
      <small>You are eligible for the followings deals</small>
      {isLoaded && (
        <div
          className="deal_item_container"
          onClick={() => addToBasket(product.variants[0].id, 1)}
        >
          <div className="deal_item_image">
            {product.images[0] ? (
              <img
                src={product.images[0].src}
                alt={`${product.title} product shot`}
              />
            ) : null}
          </div>
          <div className="deal_item_content">
            <div className="deal_item_title">{product.title}</div>
            <div className="deal_item_offer">
              only £{Math.trunc(product.variants[0].price)}
            </div>
            <div className="deal_item_click">+ ADD</div>
            {/* <div>{product.id}</div> */}
          </div>
        </div>
      )}
    </div>
  );
}
