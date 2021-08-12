import React, { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import Contact from "../components/contact-form";
class ContactUs extends Component {
  render() {
    return (
      <div className="container">
        <Head>
          <title>Calypso Sun - Contact Us</title>
        </Head>
        <div className="row">
          <h1 className="text-centre">Contact Us</h1>
          <div className="col-md-6 col-12">
            <h5>Questions about our products or an order?</h5>
            <p className="">
              Please take a look at our{" "}
              <a className="CalypsoOrangeText" href="/faq/">
                Frequently Asked Questions
              </a>{" "}
              or get in touch with us by filling out the contact form.
              Alternatively, please email or call our customer support team.
            </p>
            <p className="CalypsoOrangeText">
              <i className="far fa-envelope mr-1" />
              <a href="mailto:info@calypsosun.com">info@calypsosun.com</a>
            </p>
            <p className="CalypsoOrangeText">
              <i className="fas fa-phone mr-1" />
              <a href="tell:+441617779229">+44 (0) 161 777 9229</a>
            </p>
            <Contact />
          </div>
          <div className="col-md-6 col-12">
            <h5>Before contacting us please check this information</h5>
            <ul className="text-lg">
              <li>
                <Link href="/privacy-policy">
                  <a className="disableLink">Privacy Policy</a>
                </Link>
              </li>

              <li className="mt-1">
                <Link href="/returns-policy">
                  <a className="disableLink">Delivery & Return Policy</a>
                </Link>
              </li>
            </ul>
            <p>
              <strong>Postal Address</strong>
            </p>
            <p>
              Calypso Team - Linco Care Ltd.
              <br />
              Linco House
              <br />
              Manchester Road
              <br />
              Manchester,
              <br />
              M31 4BX
              <br />
              United Kingdom
              <br />
            </p>
            <p>
              <strong>Return Address</strong>
            </p>
            <p>
              Calypso - QHorizons Ltd.
              <br />
              Linco House
              <br />
              Manchester Road
              <br />
              Manchester,
              <br />
              M31 4BX
              <br />
              United Kingdom
              <br />
            </p>
            {/* <SiteMap /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;
