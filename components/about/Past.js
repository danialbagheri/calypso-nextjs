import React from "react";
import Image from "next/image";

export default function Past() {
  // Declare a new state variable, which we'll call "count"
  return (
    <section className="container-fluid bg-our-history our-history-row">
      <div className="row">
        <div className="col-8 col-md-8 col-sm-12 pt-1">
          <Image
            src="/about-us/calypso-history.jpg"
            alt="Calypso 1999 to 2019 products"
            width={1400}
            height={713}
            layout="responsive"
          />
        </div>
        <div className="col-4 col-md-4 text-centre col-sm-12 our-history-row-text">
          <h5 className="text-centre calypso-orange-text">PAST AND PRESENT</h5>
          <hr className="short-line" />
          <p className="text-centre mb-4">
            Calypso was created in Manchester in 1988 with a small range of
            seven products. Over the decades, Calypso has expanded and it now
            has over 60 products, which have received numerous awards, including
            the Which? Best Buy Award.
          </p>
          <a
            href="/about/history"
            className="btn bt-round btn-round-calypso mt-4"
          >
            OUR HISTORY
          </a>
        </div>
      </div>
    </section>
  );
}
