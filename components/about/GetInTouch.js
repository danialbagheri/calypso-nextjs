import React from "react";

export default function GetInTouch() {
  // Declare a new state variable, which we'll call "count"
  return (
    <section className="container">
      <h1 className="text-centre">Interested in our latest chapter?</h1>
      <h5 className="text-centre">
        <a href="/products/" className="calypso-orange-text">
          Shop
        </a>
        <span className="calypso-orange-text"> / </span>
        <a
          href="https://facebook.com/calypsosuncare/"
          target="_blank"
          rel="noopener noreferrer"
          className="calypso-orange-text"
        >
          Follow
        </a>
        <span className="calypso-orange-text"> / </span>
        <a href="mailto:hello@calypsosun.com" className="calypso-orange-text">
          Email us
        </a>
      </h5>
    </section>
  );
}
