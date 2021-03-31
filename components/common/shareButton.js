import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ShareButton({ text, media }) {
  const [displayIcon, setDisplayIcon] = useState(false);

  function showSharingIcons() {
    setDisplayIcon(!displayIcon);
  }

  const twitterBaseUrl = "https://twitter.com/intent/tweet?source=";
  const facebookBaseUrl = "https://www.facebook.com/sharer/sharer.php?u=";
  const pinterestBaseUrl = "http://pinterest.com/pin/create/button/?url=";
  const tumblrBasrUrl = "http://www.tumblr.com/share?v=3&u=";
  const router = useRouter();
  let locationUrl = "https://calypsosun.com" + router.asPath;
  let uriMedia;
  useEffect(() => {
    // locationUrl = router.asPath
    uriMedia = encodeURI(media);
  });

  const twitterUrl =
    twitterBaseUrl + locationUrl + "&text=" + text + "&via=calypsosuncare";
  const facebookUrl = facebookBaseUrl + locationUrl + "&quote=" + text;
  const pinterestUrl =
    pinterestBaseUrl +
    locationUrl +
    "&media=" +
    uriMedia +
    "&description=" +
    text;
  const mailTo = "mailto:?subject=" + text + "&body=" + locationUrl;
  const tumblrUrl = tumblrBasrUrl + locationUrl + +"&quote=" + text + "&s=";

  const icons =
    displayIcon === false ? (
      <button className="share-button" onClick={showSharingIcons}>
        <div className="icon-wrapper">
          <p>Share</p>
          <i className="fas fa-share-alt" />
        </div>
      </button>
    ) : (
      <ul id="social_sharing">
        <li>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Tweet"
          >
            <i className="fab fa-twitter" />
          </a>
        </li>
        <li>
          <a
            href={facebookUrl}
            title="Share on Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f" />
          </a>
        </li>
        <li>
          <a
            href={tumblrUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Post to Tumblr"
          >
            <i className="fab fa-tumblr" />
          </a>
        </li>
        <li>
          <a
            href={pinterestUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Pin it"
          >
            <i className="fab fa-pinterest" />
          </a>
        </li>
        <li>
          <a
            href={mailTo}
            target="_blank"
            rel="noopener noreferrer"
            title="Send email"
          >
            <i className="fa fa-at" />
          </a>
        </li>
        <li>
          <button className="close-social-icons" onClick={showSharingIcons}>
            <i className="fa fa-times" />
          </button>
        </li>
      </ul>
    );
  return <div>{icons}</div>;
}
