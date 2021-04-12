import React from "react";
import Image from "next/image";

export default function AboutUsBanner() {
  return (
    <div className="about-us-page-top-banner ">
      <Image
        src="/about-us/about-us-banner.jpg"
        alt="Frequently Asked Questions"
        layout="responsive"
        width={1366}
        height={866}
      />
    </div>
  );
}
