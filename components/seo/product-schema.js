export default function ProductSchema(props) {
  const product = props.product
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = today.getFullYear()
  const todayDate = yyyy + '-' + mm + '-' + dd

  const reviews = product.reviews.map((review, index) => {
    return (
      <div key={index}>
        <span property="reviewRating" typeof="Rating">
          <span property="ratingValue">{review.score}</span>
          <div content="5" property="schema:bestRating"></div>
        </span>
        <b>
          <span property="name">{review.title}</span>
        </b>
        <span property="author" typeof="Person">
          <span property="name">{review.customer_name}</span>
        </span>

        <meta content={review.date_created} property="datePublished" />
        {review.date_created}
        <div property="reviewBody">{review.comment}</div>
        <span property="publisher" typeof="Organization">
          <meta content="Calypso Sun" property="name" />
        </span>
      </div>
    )
  })

  return (
    <div className="d-none" typeof="Product" vocab="https://schema.org/">
      <div rel="schema:brand">
        <div typeof="schema:Brand">
          <div content="Calypso" property="schema:name"></div>
        </div>
      </div>
      <div content={product.description} property="schema:description" />
      <div content={product.variants[0].sku} property="schema:sku" />
      <div content={props.selected.barcode} property="schema:gtin14"></div>
      {/* <div property="schema:mpn" content="925872" /> */}
      <img alt={product.name} property="image" src={product.main_image} />
      <span property="name">{product.name}</span>
      <div property="review" typeof="Review">
        {reviews}
      </div>
      <div rel="schema:aggregateRating">
        <div typeof="schema:AggregateRating">
          <div
            content={product.total_review_count}
            property="schema:reviewCount"
          ></div>
          <div
            content={product.review_average_score}
            property="schema:ratingValue"
          ></div>
        </div>
      </div>
      <div rel="schema:offers">
        <div typeof="schema:Offer">
          <div
            content={product.lowest_variant_price}
            property="schema:price"
          ></div>
          <div
            content="https://schema.org/InStock"
            property="schema:availability"
          ></div>
          <div content="GBP" property="schema:priceCurrency"></div>
          <div
            content={todayDate}
            datatype="xsd:date"
            property="schema:priceValidUntil"
          ></div>
          <div
            rel="schema:url"
            resource={`https://calypsosun.com/poroducts/${product.slug}`}
          ></div>
          <div
            content="https://schema.org/NewCondition"
            property="schema:itemCondition"
          ></div>
        </div>
      </div>
    </div>
  )
}
