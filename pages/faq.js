import React from "react";
import FaqItems from "../components/faqs/faq-item";
import Image from "next/image";
export default class Faq extends React.Component {
  render() {
    return (
      <div itemScope itemType="http://schema.org/FAQPage">
        <div className="faq-row">
          <picture>
            <Image
              src="/faq/faqs.jpg"
              alt="Frequently Asked Questions"
              width="3984px"
              height="2413px"
              layout="responsive"
            />
          </picture>
          <h3 itemProp="name" className="mt-4 faq-page-title">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="container">
          <div style={{ padding: 10 }}>
            <FaqItems category="general" />
          </div>
        </div>
      </div>
    );
  }
}
