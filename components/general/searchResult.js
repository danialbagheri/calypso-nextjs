import Link from "next/link";

export default function SearchResultElements({ product }) {
  let tagNames = product.tags.slice(1, 6).map((t) => {
    return <div className="search-tag-icon">{t.name}</div>;
  });
  return (
    <div
      className="col-lg-3 col-md-3 col-sm-4 col-xs-6 mt-2 mb-2 search-result-item-box"
      index={product.id}
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
        </a>
      </Link>
    </div>
  );
}
