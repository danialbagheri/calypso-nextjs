import React from "react";
import StarRatingComponent from "react-star-rating-component";

export default function Testimonials() {
  // Declare a new state variable, which we'll call "count"
  return (
    <section className="container">
      <div className="row mt-4">
        <div className="col-md-2 col-sm-2 col-2 col-xs-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="150"
            viewBox="0 0 100 150"
          >
            <text
              id="_"
              data-name="“"
              fill="#707070"
              font-size="130"
              font-family="Baskerville-Bold, Baskerville"
              font-weight="700"
            >
              <tspan x="0" y="117">
                “
              </tspan>
            </text>
          </svg>
        </div>
        <div className="col-md-8 col-sm-8 col-8 col-xs-12">
          <p className="text-centre testimonial">
            Calypso has stunning products. We have used them in Thailand, Dubai,
            the Emirates and Oman, in temperatures of up to 45 degrees and have
            not had so much as a hint of redness.
            <br /> I would recommend these products unreservedly and would not
            use anything else.
          </p>
        </div>
        <div className="col-md-2 col-sm-2 col-2 col-xs-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="78"
            height="150"
            viewBox="0 0 78 150"
            className="quotation-mark-end"
          >
            <text
              id="_"
              data-name="”"
              transform="translate(39 117)"
              fill="#707070"
              font-size="130"
              font-family="Baskerville-Bold, Baskerville"
              font-weight="700"
            >
              <tspan x="-38.594" y="0">
                ”
              </tspan>
            </text>
          </svg>
        </div>
        <div className="row">
          <div className="text-centre">
            <StarRatingComponent
              starColor={"#fc6b21"}
              editing={false}
              starCount={5}
              name={"Score"}
              value={5}
              className="testimonial-star"
            />
            <p className="testimonial-credit">
              <span>Rhonda</span>
              <br />
              <small className="handwritten">via Facebook</small>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
