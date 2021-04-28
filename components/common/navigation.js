import { useState, useEffect } from "react";
import { useShopify } from "../hooks";
import logo from "../../public/logo.svg";
import SearchBar from "../general/searchbar";
import ActiveLink from "./active-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, showSearch] = useState(false);
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
        <ActiveLink href="/">
          <a className="navbar-brand">
            <img src={logo} alt="Calypso" width="140" height="67" />
          </a>
        </ActiveLink>
        <ul
          className={
            mobileMenu ? "navbar-nav responsive fade-in" : "navbar-nav"
          }
        >
          <li>
            <ActiveLink exact href="/">
              <a itemProp="url" className="nav-link">
                Home
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/products/">
              <a
                itemProp="url"
                className="nav-link"
                onClick={(e) => CloseMobileMenu(e)}
              >
                Products
              </a>
            </ActiveLink>
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
            <ActiveLink href="/be-sun-ready/">
              <a itemProp="url" className="nav-link">
                Be Sun Ready
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/advice/">
              <a itemProp="url" className="nav-link">
                Advice
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/about/">
              <a itemProp="url" className="nav-link">
                About Us
              </a>
            </ActiveLink>
          </li>
        </ul>
        <div className="icon-holder">
          <button
            className="search-icon"
            onClick={() => showSearch(!search)}
            aria-label="Search"
          >
            <FontAwesomeIcon icon={faSearch} className="calypso-orange-text" />
          </button>
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
      </nav>
    </>
  );
}

// WithRouter enables React Router state management
export default Navigation;
