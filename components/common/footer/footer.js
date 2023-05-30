import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/logoWhite.svg'
import tct from '../../../public/home-page/TCT.svg'
import BottomBar from './BottomBar'

import SocialMediaIcons from './SocialMediaIcons'
import FooterMenu from './FooterMenu'
import {SubscribeForm} from './subscribeForm'

const FooterMainMenu = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Be Sun Ready',
    url: '/be-sun-ready/',
  },
  {
    name: 'About Us',
    url: '/about',
  },
  {
    name: 'Products',
    url: '/products',
  },
  {
    name: 'Advice',
    url: '/advice',
  },
]
const helpMenu = [
  {
    name: 'FAQ',
    url: '/faq',
  },
  {
    name: 'Contact Us',
    url: '/contact-us',
  },
  {
    name: 'Terms & Conditions',
    url: '/terms-conditions',
  },
  {
    name: 'Privacy policy',
    url: '/privacy-policy',
  },
  {
    name: 'Return Policy',
    url: '/returns-policy/',
  },
]

export default function Footer() {
  return (
    <footer className="page-footer font-small ">
      <div className="container-fluid calypsoOrange text-md-left calypso-footer">
        <div className="container top30">
          <div className="row height250">
            <div className="col-md-5">
              <div style={{display: 'flex', flexDirection: 'flex-start'}}>
                <Image
                  src={logo}
                  className="footerLogo"
                  alt="Calypso"
                  width="70"
                  height="67"
                />
                <Image
                  src={tct}
                  className="footerLogo"
                  alt="Calypso"
                  width="180"
                  height="67"
                />
              </div>
              <p className="white">
                Get 10% off when you join our Sun-Safe family.
              </p>
              <SubscribeForm />
            </div>

            <div className="col-md-2 col-xs-6">
              <ul className="list-unstyled">
                <FooterMenu menuHeader="MENU" menuItems={FooterMainMenu} />
              </ul>
            </div>

            <div className="col-md-2 col-xs-6">
              <FooterMenu menuHeader="HELP" menuItems={helpMenu} />
            </div>
            <div className="col-md-3 col-xs-12">
              <SocialMediaIcons />
            </div>
          </div>
        </div>
        <div className="top30" />
      </div>
      <BottomBar />
    </footer>
  )
}
