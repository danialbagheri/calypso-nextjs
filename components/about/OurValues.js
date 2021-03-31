import React from "react";

export default function OurValues() {
  // Declare a new state variable, which we'll call "count"
  const ourValues = require("../../public/about-us/our-values.png");
  const qualityIcon = require("../../public/about-us/quality-icon.png");
  const ethicsIcon = require("../../public/about-us/ethical-award-icon.png");
  const innovationIcon = require("../../public/about-us/innovation-icon.png");
  return (
    <section
      style={{ backgroundImage: `url(${ourValues})` }}
      className="our-values-container container-fluid"
    >
      <div className="our-values-icon-holder">
        <h3 className="text-centre calypso-orange-text">Our Values</h3>
        <div className="row">
          <div className="col-12 col-md-4 col-xs-12">
            <div className="our-value-icon">
              <img src={qualityIcon} alt="Quality icon" width="70px" />
            </div>
            <h5 className="text-centre calypso-orange-text">QUALITY</h5>
            <p className="text-centre">
              Our products have achieved a high level of customer satisfaction
              thanks to our commitment to providing high quality sun protection
              products.
            </p>
          </div>
          <div className="col-12 col-md-4 col-xs-12">
            <div className="our-value-icon">
              <img src={ethicsIcon} alt="Quality icon" width="70px" />
            </div>
            <h5 className="text-centre calypso-orange-text">ETHICS</h5>
            <p className="text-centre">
              We received the Ethical Award from the Ethical Company
              Organisation in 2018 and 2019, recognising our strong ethical
              values.
            </p>
          </div>
          <div className="col-12 col-md-4 col-xs-12">
            <div className="our-value-icon">
              <img src={innovationIcon} alt="Quality icon" width="97px" />
            </div>
            <h5 className="text-centre calypso-orange-text">INNOVATION</h5>
            <p className="text-centre">
              Our mission is to use our research and development expertise to
              create innovative products that ensure everyone is protected from
              the sun.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
