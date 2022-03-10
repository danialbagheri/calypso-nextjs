export default function ProductSchema(props) {
  const product = props.product;
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const todayDate = yyyy + "-" + mm + "-" + dd;

  const reviews = product.reviews.map((review, index) => {
    return (
      <div key={index}>
        <span property="reviewRating" typeof="Rating">
          <span property="ratingValue">{review.score}</span>
          <div property="schema:bestRating" content="5"></div>
        </span>
        <b>
          <span property="name">{review.title}</span>"
        </b>
        <span property="author" typeof="Person">
          <span property="name">{review.customer_name}</span>
        </span>

        <meta property="datePublished" content={review.date_created} />
        {review.date_created}
        <div property="reviewBody">{review.comment}</div>
        <span property="publisher" typeof="Organization">
          <meta property="name" content="Calypso Sun" />
        </span>
      </div>
    );
  });

  return (
    <div vocab="https://schema.org/" typeof="Product" className="d-none">
      <div rel="schema:brand">
        <div typeof="schema:Brand">
          <div property="schema:name" content="Calypso"></div>
        </div>
      </div>
      <div property="schema:description" content={product.description} />
      <div property="schema:sku" content={product.variants[0].sku} />
      <div property="schema:gtin14" content={props.selected.barcode}></div>
      {/* <div property="schema:mpn" content="925872" /> */}
      <img property="image" src={product.main_image} alt={product.name} />
      <span property="name">{product.name}</span>
      <div property="review" typeof="Review">
        {reviews}
      </div>
      <div rel="schema:aggregateRating">
        <div typeof="schema:AggregateRating">
          <div
            property="schema:reviewCount"
            content={product.total_review_count}
          ></div>
          <div
            property="schema:ratingValue"
            content={product.review_average_score}
          ></div>
        </div>
      </div>
      <div rel="schema:offers">
        <div typeof="schema:Offer">
          <div
            property="schema:price"
            content={product.lowest_variant_price}
          ></div>
          <div
            property="schema:availability"
            content="https://schema.org/InStock"
          ></div>
          <div property="schema:priceCurrency" content="GBP"></div>
          <div
            property="schema:priceValidUntil"
            datatype="xsd:date"
            content={todayDate}
          ></div>
          <div
            rel="schema:url"
            resource={`https://calypsosun.com/poroducts/${product.slug}`}
          ></div>
          <div
            property="schema:itemCondition"
            content="https://schema.org/NewCondition"
          ></div>
        </div>
      </div>
    </div>
  );
}
