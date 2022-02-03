import Link from "next/link";
import AddToBasket from "../products/detail/add-to-basket";

export default function SearchResultElements({ product }) {
  let tagNames = product.tags.slice(1, 6).map((t) => {
    return <div className="search-tag-icon">{t.name}</div>;
  });
  return (
    <div
      className="col-lg-3 col-md-3 col-sm-4 col-xs-6 mt-2 mb-2 search-result-item-box"
      key={product.id}
    >
      <Link href={`/products/${product.slug}`} className="search-result-item">
        <a className="disableLink">
          <div className="col-md-12 col-xd-3">
            <img
              src={product.main_image}
              width="100px"
              alt={product.name}
              className="search-result-image"
            />
          </div>
          <div className="col-md-12 col-xd-9 mt-2">
            <h6 className="text-centre m-0">{product.name}</h6>
            <p className="text-centre m-0">{product.sub_title}</p>
            <p className="text-centre mt-1 text-secondary">
              <small>{tagNames}</small>
            </p>
          </div>
          <div className="col-12 col-md-12">
            <AddToBasket
              variantId={product.variants[0].shopify_storefront_variant_id}
              quantity={1}
            />
          </div>
        </a>
      </Link>
    </div>
  );
}
