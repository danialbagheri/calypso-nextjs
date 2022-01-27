import { useEffect, useState } from "react";
import { useShopify } from "../hooks";

export default function DealItem() {
  const [product, setProduct] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const { fetchProductByQuery } = useShopify();

  useEffect(() => {
    const query = {
      query: `product:[id:6783989088393]`,
    };

    const f = fetchProductByQuery(query);
    f.then((f) => {
      console.log(f);
      console.log(f[0]);
      setProduct(f[0]);
      setLoaded(true);
    });
  }, []);
  return (
    <div>
      <small>You are eligible for the followings deals</small>
      {isLoaded && (
        <div
          className="deal_item_container"
          onClick={() => console.log("clicked", product.id)}
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
            <div className="deal_item_offer">only £1</div>
            {/* <div>{product.id}</div> */}
          </div>
        </div>
      )}
    </div>
  );
}
