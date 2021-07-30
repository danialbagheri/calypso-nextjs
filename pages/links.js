import Styles from "../styles/links.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Links() {
  return (
    <div className={Styles.parent}>
      <Link className={Styles.link} href="/products/">
        <a className={Styles.link}>
          <div className={Styles.linkButton}>🧴 Discover our products</div>
        </a>
      </Link>
      <Link className={Styles.link} href="/advice/">
        <a className={Styles.link}>
          <div className={Styles.linkButton}>⭐ Advice</div>
        </a>
      </Link>
      <Link
        className={Styles.link}
        href="https://www.instagram.com/calypsosuncare/"
      >
        <a className={Styles.link}>
          <div className={Styles.linkButton}>
            <div className={Styles.icons}>
              <FontAwesomeIcon icon={faInstagram} />
              <span>Instagram</span>
            </div>
          </div>
        </a>
      </Link>
      <Link
        className={Styles.link}
        href="https://www.facebook.com/calypsosuncare/"
      >
        <a className={Styles.link}>
          <div className={Styles.linkButton}>
            <div className={Styles.icons}>
              <FontAwesomeIcon icon={faFacebook} />
              <span>Facebook</span>
            </div>
          </div>
        </a>
      </Link>
      <Link className={Styles.link} href="https://twitter.com/calypsosuncare">
        <a className={Styles.link}>
          <div className={Styles.linkButton}>
            <div className={Styles.icons}>
              <FontAwesomeIcon icon={faTwitter} />
              <span>Twitter</span>
            </div>
          </div>
        </a>
      </Link>
      <Link
        className={Styles.link}
        href="https://www.youtube.com/channel/UCrZ14JcmZRDobPIVo8ptmrw"
      >
        <a className={Styles.link}>
          <div className={Styles.linkButton}>
            <div className={Styles.icons}>
              <FontAwesomeIcon icon={faYoutube} />
              <span>YouTube</span>
            </div>
          </div>
        </a>
      </Link>
      <Link className={Styles.link} href="/contact-us/">
        <a className={Styles.link}>
          <div className={Styles.linkButton}>
            <div className={Styles.icons}>
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Contact Us</span>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
