import React from "react";
import YouTube from "react-youtube";
import MediaQuery from "react-responsive";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
export default function StaySafe() {
  // _onReady(event) {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // }
  const videos = [
    {
      image: "/video-thumbnails/holly.png",
      title: "Once a day for Kids",
      link:
        "https://www.youtube.com/watch?v=6kgF4jr6kbE&list=PLQitqtgpPbJTuQKDE899W_3A8LHCKTWBl&index=5",
      width: "1586px",
      height: "849px",
    },
    {
      image: "/video-thumbnails/kelly.png",
      title: "Sun Safety tips for Families",
      link:
        "https://www.youtube.com/watch?v=6kgF4jr6kbE&list=PLQitqtgpPbJTuQKDE899W_3A8LHCKTWBl&index=5",
      width: "1586px",
      height: "849px",
    },
    {
      image: "/video-thumbnails/rte.png",
      title: "How much sunscreen should you apply?",
      link:
        "https://www.youtube.com/watch?v=6kgF4jr6kbE&list=PLQitqtgpPbJTuQKDE899W_3A8LHCKTWBl&index=5",
      width: "1586px",
      height: "849px",
    },
  ];
  const settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dotsClass: "dot",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const youtubeDesktop = {
    height: "390px",
    width: "640px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const youtubeMobile = {
    height: "180px",
    width: "350px",
    playerVars: {
      autoplay: 0,
    },
  };
  let videoThumbnails = videos.map((video, index) => {
    return (
      <div className="pr-1">
        <Link href={video.link} key={index}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="video-thumbnail disableLink"
          >
            <div className="bg-calypso text-white m-0">
              <p className="m-0 text-centre">{video.title}</p>
            </div>
            <Image
              itemProp="url contentUrl"
              src={video.image || "/advice/placeholder.png"}
              // className="blog-post-image"
              alt={video.title}
              layout="responsive"
              height={video.height}
              width={video.width}
            />
          </a>
        </Link>
      </div>
    );
  });

  return (
    <div className="container-fluid yellow-background top50">
      <div className="row">
        <div className="col-2 col-md-2" />
        <div className="col-8 col-md-8">
          <img
            alt="Stay safe with Calypso"
            className="stay-safe top30"
            src={require("../../public/home-page/Stay-Safe-with-Calypso.png")}
          />
          <Slider {...settings}>{videoThumbnails}</Slider>

          <h1 className="text-centre">Sun Safety Tips for Families</h1>
          <p className="text-centre">
            Unsure of how best to keep your family protected from the sun this
            summer? Watch our video to get some valuable sun care advice from
            NHS Nurse Manager and travel influencer Karen Edwards, better known
            as <span />
            <a
              href="https://travelmadmum.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Travel Mad Mum
            </a>
            , who was recently interviewed by Katy Booth on BBC Radio
            Lancashire.
          </p>
        </div>
        <div className="col-2 col-md-2" />
      </div>
    </div>
  );
}
