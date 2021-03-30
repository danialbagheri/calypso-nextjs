import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useShopify } from "../hooks";
import logo from "../../public/logo.svg";
import SearchBar from "../general/searchbar";

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
        <Link className="navbar-brand" href="/">
          <img src={logo} alt="Calypso" width="140" height="67" />
        </Link>

        <ul
          className={
            mobileMenu ? "navbar-nav responsive fade-in" : "navbar-nav"
          }
        >
          <li>
            <Link itemProp="url" exact className="nav-link" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link itemProp="url" className="nav-link" href="/products/">
              Products
            </Link>
          </li>
          {/* <li>
            <Link
              itemProp="url"
              className="nav-link"
              href="/products/"
            >
              Mix & Match
            </Link>
          </li> */}
          <li>
            <Link itemProp="url" className="nav-link" href="/be-sun-ready/">
              Be Sun Ready
            </Link>
          </li>
          <li>
            <Link itemProp="url" className="nav-link" href="/advice/">
              Advice
            </Link>
          </li>
          <li>
            <Link itemProp="url" className="nav-link" href="/about/">
              About Us
            </Link>
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
