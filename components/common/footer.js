import React from "react";
import logo from "../../public/logoWhite.svg";
import externalLink from "../../public/icons/external-link.svg";
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
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/be-sun-ready">Be Sun Ready</a>
                  </li>
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>
                    <a href="/products">Products</a>
                  </li>
                  <li>
                    <a href="/advice">Advice</a>
                  </li>
                </ul>
              </div>

              <div className="col-md-2 col-xs-6">
                <ul className="list-unstyled">
                  <li>
                    <a href="/faq">HELP & FAQ</a>
                  </li>
                  <li>
                    <a href="/contact-us">Contact Us</a>
                  </li>
                  <li>
                    <a href="/delivery-&-return-policy">Delivery & Return</a>
                  </li>
                  <li>
                    <a href="/privacy-policy">Privacy policy</a>
                  </li>
                  <li>
                    <a href="/site-map/">Site Map</a>
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
            <meta itemProp="name" content="Linco Care limited" />
            <div className="linco-branding">
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
              <a
                className=""
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
          </div>
        </div>
      </footer>
    );
  }
}
