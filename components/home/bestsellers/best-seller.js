import Styles from "../../../styles/bestseller.module.css";

import BestSellerItems from "./BestSellerItems";

export default function BestSeller(props) {
  const collection = props.bestseller;

  const collectionItems = collection.items.slice(0, 6).map((item) => {
    return <BestSellerItems item={item} key={item.id} />;
  });

  const collectionHTML = (
    <div>
      {collection ? (
        <div className={Styles.Container}>
          <div>
            <source srcSet={collection.webp} type="image/webp" />
            <source srcSet={collection.resized} media="(max-width: 600px)" />
            <img src={collection.image} alt="Calypso Best Seller products" />
          </div>
          <div className={Styles.productContainer}>{collectionItems}</div>
        </div>
      ) : null}
    </div>
  );
  return (
    <div>
      <h1 className="textCenter">Top Seller products</h1>
      {collectionHTML}
    </div>
  );
}
