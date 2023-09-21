import {useEffect, useState} from 'react'
import {useShopify} from '../hooks'
import logo from '../../public/logo.svg'
import SearchBar from '../general/searchbar'
import Link from 'next/link'
import ActiveLink from './active-link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBars,
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons'

import MegaMenu from './megaMenu'
import {SearchModal} from 'components/searchModal'

function Navigation() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [search, showSearch] = useState(false)
  const [openSearchModal, setOpenSearchModal] = useState(false)
  const [showMegaMenu, toggleMegaMenu] = useState(false)
  const [productsPageMegaMenu, setProductPageMegaMenu] = useState([])
  const {openCart} = useShopify()

  useEffect(() => {
    const navbar = document.getElementsByClassName('navbar-fixed-top')[0]

    window.onscroll = () => {
      if (window.pageYOffset >= 10) {
        navbar.style.position = 'fixed'
        navbar.style.top = '0'
        navbar.style.boxShadow = '0 0 4px 2px rgba(0,0,0,0.3)'
      } else {
        navbar.style.position = 'relative'
        navbar.style.marginTop = '0'
        navbar.style.boxShadow = 'none'
      }
    }
  }, [])

  useEffect(() => {
    const endPoint =
      'https://service.calypsosun.com/api/products/collections/products-mega-menu/?resize_w=280'
    fetch(endPoint)
      .then(res => res.json())
      .then(data => {
        setProductPageMegaMenu(data.items)
      })
      .catch(err => console.log(err))
  }, [])

  const openResponsiveMenu = () => {
    setMobileMenu(!mobileMenu)
  }

  function CloseMobileMenu() {
    setMobileMenu(false)
  }

  return (
    <>
      <SearchBar visibilitySetter={showSearch} visible={search} />
      <nav
        className="navbar navbar-fixed-top"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <div className="navbar-content">
          <Link className="navbar-brand" href="/">
            <img alt="Calypso" height="47" src={logo} width="150" />
          </Link>
          <ul
            className={
              mobileMenu ? 'navbar-nav responsive fade-in' : 'navbar-nav'
            }
          >
            <li>
              <ActiveLink
                className="nav-link"
                exact="true"
                href="/"
                itemProp="url"
                onClick={e => CloseMobileMenu(e)}
              >
                Home
              </ActiveLink>
            </li>
            <li
              onMouseEnter={() => toggleMegaMenu(true)}
              onMouseLeave={() => toggleMegaMenu(false)}
            >
              <ActiveLink
                className="nav-link"
                href="/products"
                itemProp="url"
                onClick={e => CloseMobileMenu(e)}
              >
                Products
              </ActiveLink>
              {showMegaMenu && <MegaMenu products={productsPageMegaMenu} />}
            </li>
            {/* <li>
            <ActiveLink
              itemProp="url"
              className="nav-link"
              href="/products/"
            >
                   Mix & Match
                  </ActiveLink>
             </li> */}
            <li>
              <ActiveLink
                className="nav-link"
                href="/be-sun-ready"
                itemProp="url"
                onClick={e => CloseMobileMenu(e)}
              >
                Be Sun Ready
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                className="nav-link"
                href="/advice"
                itemProp="url"
                onClick={e => CloseMobileMenu(e)}
              >
                Advice
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                className="nav-link"
                href="/about"
                itemProp="url"
                onClick={e => CloseMobileMenu(e)}
              >
                About Us
              </ActiveLink>
            </li>
          </ul>
          <div className="icon-holder">
            <button
              aria-label="Search"
              className="search-icon"
              onClick={() => setOpenSearchModal(true)}
            >
              <FontAwesomeIcon
                className="calypso-orange-text"
                icon={faSearch}
              />
              {openSearchModal ? (
                <SearchModal setOpenSearchModal={setOpenSearchModal} />
              ) : null}
            </button>
            <button
              aria-label="open Cart"
              className="basket-icon"
              onClick={openCart}
            >
              <FontAwesomeIcon
                className="calypso-orange-text"
                icon={faShoppingCart}
              />
            </button>

            <button
              aria-label="Menu"
              className="burgerMenu"
              onClick={openResponsiveMenu}
            >
              {/* <i className="fa fa-bars" /> */}
              <FontAwesomeIcon className="calypso-orange-text" icon={faBars} />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

// WithRouter enables React Router state management
export default Navigation
