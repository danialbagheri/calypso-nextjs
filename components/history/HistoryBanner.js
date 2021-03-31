import React from "react";

export default function HistoryBanner() {
  // Declare a new state variable, which we'll call "count"
  const historyBanner = require("../../public/history/historybanner.png");
  return (
    <div className="about-us-page-top-banner ">
      <picture>
        <img
          src={historyBanner}
          alt="Calypso Brand History product range"
          width="100%"
        />
      </picture>
    </div>
  );
}
