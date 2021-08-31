export default function ProductSchema(props) {
  const product = props.product;
  const reviews = product.reviews.map((review, index) => {
    return (
      <div key={index}>
        <div rel="schema:reviewRating">
          <div typeof="schema:Rating">
            <div property="schema:ratingValue" content={review.score}></div>
            <div property="schema:bestRating" content="5"></div>
          </div>
        </div>
        <div rel="schema:author">
          <span property="author" typeof="Person">
            <span property="name">{review.customer_name}</span>
          </span>
          <div typeof="schema:Person">
            <div property="schema:name" content={review.customer_name}></div>
            <meta property="datePublished" content={review.date_created}></meta>
          </div>
          <div property="publisher" typeof="Organization">
            <meta property="name" content={review.source} />
          </div>
          <span property="reviewBody">{review.comment}</span>
        </div>
      </div>
    );
  });
  return (
    <div typeof="schema:Product" className="hide">
      <div property="schema:sku" content={product.variants[0].sku}></div>
      {/* <div property="schema:gtin14" content="12345678901234"></div> */}
      <div property="schema:name" content={product.name}></div>
      <div rel="schema:image" resource={product.main_image}></div>
      <div rel="schema:image" resource={product.main_image_resized}></div>
      <div rel="schema:image" resource={product.main_image_webp}></div>
      <div property="schema:description" content={product.description}></div>
      <div rel="schema:brand">
        <div typeof="schema:Brand">
          <div property="schema:name" content="Calypso"></div>
        </div>
      </div>
      <div rel="schema:offers">
        <div typeof="schema:Offer">
          <div
            rel="schema:url"
            resource={`https://calypsosun.com/poroducts/${product.slug}`}
          ></div>
          <div
            property="schema:itemCondition"
            content="https://schema.org/NewCondition"
          ></div>
          <div
            property="schema:availability"
            content="https://schema.org/InStock"
          ></div>
          <div
            property="schema:price"
            content={product.lowest_variant_price}
          ></div>
          <div property="schema:priceCurrency" content="GBP"></div>
          <div
            property="schema:priceValidUntil"
            datatype="xsd:date"
            content="2024-11-20"
          ></div>
          <div rel="schema:shippingDetails">
            <div typeof="schema:OfferShippingDetails">
              <div rel="schema:shippingRate">
                <div typeof="schema:MonetaryAmount">
                  <div property="schema:value" content="0"></div>
                  <div property="schema:currency" content="GBP"></div>
                </div>
              </div>
              <div rel="schema:shippingDestination">
                <div typeof="schema:DefinedRegion">
                  <div property="schema:addressCountry" content="UK"></div>
                  {/* <div rel="schema:postalCodeRange">
                    <div typeof="schema:PostalCodeRangeSpecification">
                      <div
                        property="schema:postalCodeBegin"
                        content="98100"
                      ></div>
                      <div
                        property="schema:postalCodeEnd"
                        content="98199"
                      ></div>
                    </div> 
                  </div>*/}
                </div>
              </div>
              <div rel="schema:deliveryTime">
                <div typeof="schema:ShippingDeliveryTime">
                  <div rel="schema:handlingTime">
                    <div typeof="schema:QuantitativeValue">
                      <div property="schema:minValue" content="0"></div>
                      <div property="schema:maxValue" content="1"></div>
                    </div>
                  </div>
                  <div rel="schema:transitTime">
                    <div typeof="schema:QuantitativeValue">
                      <div property="schema:minValue" content="1"></div>
                      <div property="schema:maxValue" content="2"></div>
                    </div>
                  </div>
                  <div property="schema:cutOffTime" content="14:30-08:00"></div>
                  <div rel="schema:businessDays">
                    <div typeof="schema:OpeningHoursSpecification">
                      <div
                        property="schema:dayOfWeek"
                        content="https://schema.org/Monday"
                      ></div>
                      <div
                        property="schema:dayOfWeek"
                        content="https://schema.org/Tuesday"
                      ></div>
                      <div
                        property="schema:dayOfWeek"
                        content="https://schema.org/Wednesday"
                      ></div>
                      <div
                        property="schema:dayOfWeek"
                        content="https://schema.org/Thursday"
                      ></div>
                      <div
                        property="schema:dayOfWeek"
                        content="https://schema.org/Friday"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div rel="schema:review">
        <div typeof="schema:Review">
          <div property="itemReviewed" typeof="Product">
            {reviews}
          </div>
        </div>
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
    </div>
  );
}
