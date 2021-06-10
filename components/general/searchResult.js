export default function SearchResultElements({ product }) {
  return (
    <div className="col-md-3 col-xs-6" index={product.id}>
      <a href={`/products/${product.slug}`} className="search-result-item">
        <div className="col-md-12 col-xd-3">
          <img
            src={product.main_image}
            width="100px"
            alt={product.name}
            className="search-result-image"
          />
        </div>
        <div className="col-md-12 col-xd-9">
          <h6 className="text-centre m-0">{product.name}</h6>
          <p className="text-centre">{product.sub_title}</p>
        </div>
      </a>
    </div>
  );
}
