import { useState, useEffect } from "react";
import data from "../../data.json";
//import ReactInstagramFeed from "react-instagram-feed";

export default function Instagram() {
  const [feed, setFeed] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    fetchInstaImages();
  }, []);

  function fetchInstaImages() {
    const baseUrl = data.apiUrl;
    const endPoint = baseUrl + "web/instagram-feed/";
    fetch(endPoint)
      .then((response) => response.json())
      .then((result) => {
        setFeed(result);
      });
  }

  let thumbnailWidth = 186;
  const quantityOfInstagramImages = Math.floor(windowWidth / thumbnailWidth);
  thumbnailWidth = windowWidth / quantityOfInstagramImages;
  // Loading component
  const loading = <div className="p-2 general-loader" />;
  // Instagram feed component
  const instagramPost = feed
    .slice(0, quantityOfInstagramImages)
    .map((insta, index) => (
      <a
        className="instaPost"
        href={insta.permalink}
        target="_blank"
        rel="noopener noreferrer"
        key={index}
      >
        <picture>
          <source srcSet={insta.webp} alt={insta.caption} type="image/webp" />
          <source
            srcSet={insta.thumbnail}
            alt={insta.caption}
            type="image/png"
          />
          <img
            src={insta.thumbnail}
            width={thumbnailWidth + "px"}
            height={thumbnailWidth + "px"}
            alt={insta.caption}
            loading="lazy"
          />
        </picture>
        <div className="insta-caption">{insta.caption}</div>
      </a>
    ));
  const instagramFeed = <div className="instagramFeed">{instagramPost}</div>;
  return (
    <div className="top50 insta">
      <h1 className="CalypsoOrangeText text-centre"> #FindTheFeeling</h1>
      <h2 className="text-centre">
        Share your summer moments with us on Instagram.
      </h2>
      {feed ? instagramFeed : loading}
      <div className="clearfix" />
    </div>
  );
}
