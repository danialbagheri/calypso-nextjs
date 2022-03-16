// import React from "react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import TopBar from "./topbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import data from "../../data.json";
export default function InfoBar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: false,
    vertical: false,
    verticalSwiping: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 3000,
          // centerMode: true,
          vertical: true,
          verticalSwiping: true,
        },
      },
    ],
  };
  // Similar to componentDidMount and componentDidUpdate:
  async function getInfoBarStatus() {
    const endpoint = data.apiUrl + "web/top-bars/";
    const res = await fetch(endpoint);
    const json = await res.json();
    setItems(json[0].items);
    setIsLoaded(true);
  }
  useEffect(() => {
    // Update the document title using the browser API
    getInfoBarStatus();
  }, []);

  console.log(items);
  if (isLoaded) {
    const infoBarItems = items.map((item) => {
      return (
        <div>
          <div className="info-bar-item" key={item.id}>
            <div className="info-bar-icon">
              <Image
                src={item.icon}
                layout="responsive"
                width={30}
                height={30}
                alt={item.text}
              />
            </div>
            <div className="text-centre">{item.text}</div>
          </div>
        </div>
      );
    });
    return (
      <>
        <TopBar />
        <div className="info-bar">
          <Slider {...settings}>{infoBarItems}</Slider>
        </div>
      </>
    );
  } else {
    return null;
  }
}
