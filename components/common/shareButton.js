import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faPinterest,
  faTumblr,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import {faShareAlt, faTimes} from '@fortawesome/free-solid-svg-icons'
export default function ShareButton({text, media}) {
  const [displayIcon, setDisplayIcon] = useState(false)

  function showSharingIcons() {
    setDisplayIcon(!displayIcon)
  }

  const twitterBaseUrl = 'https://twitter.com/intent/tweet?source='
  const facebookBaseUrl = 'https://www.facebook.com/sharer/sharer.php?u='
  const pinterestBaseUrl = 'http://pinterest.com/pin/create/button/?url='
  const tumblrBaseUrl = 'http://www.tumblr.com/share?v=3&u='
  const router = useRouter()
  const locationUrl = 'https://calypsosun.com' + router.asPath
  let uriMedia
  useEffect(() => {
    // locationUrl = router.asPath
    uriMedia = encodeURI(media)
  })

  const twitterUrl =
    twitterBaseUrl + locationUrl + '&text=' + text + '&via=calypsosuncare'
  const facebookUrl = facebookBaseUrl + locationUrl + '&quote=' + text
  const pinterestUrl =
    pinterestBaseUrl +
    locationUrl +
    '&media=' +
    uriMedia +
    '&description=' +
    text
  const mailTo = 'mailto:?subject=' + text + '&body=' + locationUrl
  const tumblrUrl = tumblrBaseUrl + locationUrl + +'&quote=' + text + '&s='

  const icons =
    displayIcon === false ? (
      <button className="share-button" onClick={showSharingIcons}>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faShareAlt} />
          <p>Share</p>
        </div>
      </button>
    ) : (
      <ul id="social_sharing-icon">
        <li>
          <a
            href={twitterUrl}
            rel="noopener noreferrer"
            target="_blank"
            title="Tweet"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <li>
          <a
            href={facebookUrl}
            rel="noopener noreferrer"
            target="_blank"
            title="Share on Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </li>
        <li>
          <a
            href={tumblrUrl}
            rel="noopener noreferrer"
            target="_blank"
            title="Post to Tumblr"
          >
            <FontAwesomeIcon icon={faTumblr} />
          </a>
        </li>
        <li>
          <a
            href={pinterestUrl}
            rel="noopener noreferrer"
            target="_blank"
            title="Pin it"
          >
            <FontAwesomeIcon icon={faPinterest} />
          </a>
        </li>
        <li>
          <a
            href={mailTo}
            rel="noopener noreferrer"
            target="_blank"
            title="Send email"
          >
            <i className="fa fa-at" />
          </a>
        </li>
        <li>
          <button className="close-social-icons" onClick={showSharingIcons}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </li>
      </ul>
    )
  return <div>{icons}</div>
}
