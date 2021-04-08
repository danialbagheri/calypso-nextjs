import { useState, useEffect } from "react";
import Link from "next/link";
import { useShopify } from "../hooks";
import logo from "../../public/logo.svg";
import SearchBar from "../general/searchbar";
import ActiveLink from "./active-link";

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
            <ActiveLink href="/products">
              <a itemProp="url" className="nav-link">
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
            <ActiveLink href="/be-sun-ready">
              <a itemProp="url" className="nav-link">
                Be Sun Ready
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/advice">
              <a itemProp="url" className="nav-link">
                Advice
              </a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/about">
              <a itemProp="url" className="nav-link">
                About Us
              </a>
            </ActiveLink>
          </li>
        </ul>
        <div className="icon-holder">
          <button className="search-icon" onClick={() => showSearch(!search)}>
            <i className="fas fa-search" />
          </button>
          <button className="basket-icon" onClick={openCart}>
            <i className="fas fa-shopping-cart" />
          </button>

          <button className="burgerMenu" onClick={openResponsiveMenu}>
            <i className="fa fa-bars" />
          </button>
        </div>
      </nav>
    </>
  );
}

// WithRouter enables React Router state management
export default Navigation;
