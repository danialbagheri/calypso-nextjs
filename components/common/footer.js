import React from "react";
import logo from "../../public/logoWhite.svg";
import externalLink from "../../public/icons/external-link.svg";
import Link from "next/link";
import PaymentIcon from "./payment-icons";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriber: "",
    };
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(subscriber) {
    return null;
  }
  render() {
    var date = new Date();
    return (
      <footer className="page-footer font-small ">
        <div className="container-fluid calypsoOrange text-md-left">
          <div className="container top30">
            <div className="row height250">
              <div className="col-md-5">
                <img
                  src={logo}
                  className="footerLogo"
                  alt="Calypso"
                  width="140"
                  height="67"
                />
                <p className="white">
                  Get 10% off when you join our Sun-Safe family.
                </p>
                <form
                  action="https://lincocare.us14.list-manage.com/subscribe/post?u=421f0bb9a595c039a66840b25&amp;id=c458361e44"
                  method="POST"
                  name="mc-embedded-subscribe-form"
                  className="validate subscribe-form"
                >
                  <input
                    type="hidden"
                    name="u"
                    value="a123cd45678ef90g7h1j7k9lm"
                  />
                  <input type="hidden" name="id" value="ab2c468d10" />
                  <input className="emailInput" type="email" name="MERGE0" />
                  <button className="buttonYellow" type="submit">
                    SUBSCRIBE
                  </button>
                </form>
              </div>

              <div className="col-md-2 col-xs-6">
                <ul className="list-unstyled">
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/be-sun-ready/">
                      <a>Be Sun Ready</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a>About Us</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/products">
                      <a>Products</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/advice">
                      <a>Advice</a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-2 col-xs-6">
                <ul className="list-unstyled">
                  <li>
                    <Link href="/faq">
                      <a>HELP & FAQ</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us">
                      <a>Contact Us</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-conditions">
                      <a>Terms & Conditions</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a>Privacy policy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns-policy/">
                      <a>Return Policy</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-xs-12">
                <p className=" white">Follow us</p>

                <div className="floatLeft">
                  <a
                    href="https://www.facebook.com/calypsosuncare/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="Facebook"
                      src={require("../../public/socialMedia/fa.png")}
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://twitter.com/calypsosuncare"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="Twitter"
                      src={require("../../public/socialMedia/tw.png")}
                    />
                  </a>
                </div>
                <div className="floatLeft">
                  <a
                    href="https://www.instagram.com/calypsosuncare/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="Instagram"
                      src={require("../../public/socialMedia/in.png")}
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.youtube.com/channel/UCrZ14JcmZRDobPIVo8ptmrw"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="Youtube"
                      src={require("../../public/socialMedia/yo.png")}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="top30" />
        </div>
        <div className="container">
          <div
            className="bottom-bar"
            itemProp="publisher"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <div className="linco-branding">
              <meta itemProp="name" content="Linco Care limited" />
              <img
                className="linco-logo"
                src={require("../../public/home-page/Droplets.png")}
                alt="Linco Care logo Icon"
              />
              <p>
                Copyright&#169; Linco Care Ltd {date.getFullYear()} | United
                Kingdom
              </p>
            </div>
            <div className="linco-care-com">
              <div>
                <a
                  href="https://lincocare.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  lincocare.com{" "}
                  <img
                    src={externalLink}
                    alt="externalurl"
                    width="14"
                    height="14"
                  />
                </a>
              </div>
              <PaymentIcon />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
