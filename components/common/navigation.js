import { useState, useEffect } from "react";
import { useShopify } from "../hooks";
import logo from "../../public/logo.svg";
import SearchBar from "../general/searchbar";
import Link from "next/link";
import ActiveLink from "./active-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import MegaMenu from "./megaMenu";

function Navigation() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, showSearch] = useState(false);
  const [showMegaMenu, toggleMegaMenu] = useState(false);
  const [productsPageMegaMenu, setProductPageMegaMenu] = useState([]);
  const { openCart } = useShopify();
  useEffect(() => {
    const navbar = document.getElementsByClassName("navbar-fixed-top")[0];
    let sticky = navbar.offsetTop;
    window.onscroll = () => {
      if (window.pageYOffset >= sticky) {
        navbar.style.position = "fixed";
        navbar.style.top = "0";
      } else {
        navbar.style.position = "relative";
        navbar.style.marginTop = "0";
      }
    };
  });

  useEffect(() => {
    const endPoint =
      "https://service.calypsosun.com/api/products/collections/products-mega-menu/?resize_w=280";
    fetch(endPoint)
      .then((res) => res.json())
      .then((data) => {
        setProductPageMegaMenu(data.items);
      });
  }, []);

  const openResponsiveMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  function CloseMobileMenu(e) {
    setMobileMenu(false);
  }
  return (
    <>
      <SearchBar visible={search} visibilitySetter={showSearch} />
      <nav
        className="navbar navbar-fixed-top"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <div className="navbar-content">
          <Link href="/">
            <a className="navbar-brand">
              <img src={logo} alt="Calypso" width="150" height="47" />
            </a>
          </Link>
          <ul
            className={
              mobileMenu ? "navbar-nav responsive fade-in" : "navbar-nav"
            }
          >
            <li>
              <ActiveLink exact href="/">
                <a
                  itemProp="url"
                  className="nav-link"
                  onClick={(e) => CloseMobileMenu(e)}
                >
                  Home
                </a>
              </ActiveLink>
            </li>
            <li
              onMouseEnter={() => toggleMegaMenu(true)}
              onMouseLeave={() => toggleMegaMenu(false)}
            >
              <ActiveLink href="/products">
                <a
                  itemProp="url"
                  className="nav-link"
                  onClick={(e) => CloseMobileMenu(e)}
                >
                  Products
                </a>
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
              <ActiveLink href="/be-sun-ready">
                <a
                  itemProp="url"
                  className="nav-link"
                  onClick={(e) => CloseMobileMenu(e)}
                >
                  Be Sun Ready
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/advice">
                <a
                  itemProp="url"
                  className="nav-link"
                  onClick={(e) => CloseMobileMenu(e)}
                >
                  Advice
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/about">
                <a
                  itemProp="url"
                  className="nav-link"
                  onClick={(e) => CloseMobileMenu(e)}
                >
                  About Us
                </a>
              </ActiveLink>
            </li>
          </ul>
          <div className="icon-holder">
            <Link href="/search/">
              <button
                className="search-icon"
                // onClick={() => showSearch(!search)}
                aria-label="Search"
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="calypso-orange-text"
                />
              </button>
            </Link>
            <button
              className="basket-icon"
              onClick={openCart}
              aria-label="open Cart"
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="calypso-orange-text"
              />
            </button>

            <button
              className="burgerMenu"
              onClick={openResponsiveMenu}
              aria-label="Menu"
            >
              {/* <i className="fa fa-bars" /> */}
              <FontAwesomeIcon icon={faBars} className="calypso-orange-text" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

// WithRouter enables React Router state management
export default Navigation;
