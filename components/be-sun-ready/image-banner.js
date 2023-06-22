import React from 'react'
import Image from 'next/image'
export default class ImageBanner extends React.Component {
  render() {
    return (
      <div itemScope itemType="http://schema.org/FAQPage">
        <div className="faq-row">
          <div style={{width: '100%', height: '420px'}}>
            <Image
              alt="Frequently Asked Questions"
              fill
              src="/be-sun-ready/banner-sun-safe.png"
              style={{objectFit: 'cover'}}
            />
          </div>
          <div className="be-sun-ready-heading">
            <p className="sun-ready-title">BE SUN READY</p>
            <p className="sun-ready-secondary">
              LEARNING HOW TO PROTECT
              <br /> YOURSELF FROM THE SUN
            </p>
          </div>
        </div>
      </div>
    )
  }
}
