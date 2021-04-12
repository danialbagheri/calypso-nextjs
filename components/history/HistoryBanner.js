import React from "react";
import Image from "next/image";
export default function HistoryBanner() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div className="about-us-page-top-banner ">
      <picture>
        <Image
          src="/history/historybanner.png"
          alt="Calypso Brand History product range"
          width={1377}
          height={840}
          layout="responsive"
        />
      </picture>
    </div>
  );
}
