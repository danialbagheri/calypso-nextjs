import React from "react";

export default function AboutUsBanner() {
  // Declare a new state variable, which we'll call "count"
  const aboutUsBanner = require("../../public/about-us/about-us-banner.jpg");
  return (
    <div className="about-us-page-top-banner ">
      <picture>
        <img
          src={aboutUsBanner}
          alt="Frequently Asked Questions"
          width="100%"
        />
      </picture>
    </div>
  );
}
