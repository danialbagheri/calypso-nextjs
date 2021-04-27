import React, { useState, useEffect } from "react";
import data from "../../data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({ visible, visibilitySetter }) {
  const [searchVal, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [searchResultCount, setSearchResultCount] = useState(0);

  function handleChange(e) {
    setSearchValue(e.target.value);

    if (e.target.value === "") {
      setSearchValue("");
      setSearchResult("");
      setSearchResultCount(0);
    }
  }

  const search = (e) => {
    e.preventDefault();
    const baseUrl = data.apiUrl;
    const endPoint = `${baseUrl}web/search/?q=${searchVal}`;
    fetch(endPoint)
      .then((response) => response.json())
      .then((result) => {
        if (result.count >= 1) {
          setSearchValue(null);
          setSearchResult(result.results);
          setSearchResultCount(result.count);
        }
      });
  };
  function searchOnEnter(e) {
    if (e.key === "Enter") {
      search(e);
    }
  }
  const results =
    searchResultCount >= 1 ? (
      searchResult.map((p) => (
        <div className="col-md-3 col-xs-6">
          <a href={`/products/${p.slug}`} className="search-result-item">
            <div className="col-md-12 col-xd-3">
              <img
                src={p.main_image}
                width="100px"
                alt={p.name}
                className="search-result-image"
              />
            </div>
            <div className="col-md-12 col-xd-9">
              <h2 className="text-centre m-0">{p.name}</h2>
              <p className="text-centre">{p.sub_title}</p>
            </div>
          </a>
        </div>
      ))
    ) : (
      <span></span>
    );
  return (
    <div
      className={
        visible
          ? "search-page product-search-page-show"
          : "product-search-page-hide "
      }
    >
      <div className="search-container">
        <div className="search-box" id="search-form">
          <button
            className="search-menu-button search-icon"
            onClick={() => {
              visibilitySetter(false);
            }}
            type="button"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <input
            className="search-field"
            name="searchVal"
            value={searchVal}
            placeholder="Search our catalogue 🧴 🌞 🏖️"
            list="searchOptions"
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => searchOnEnter(e)}
          />
          <datalist id="searchOptions">
            <option value="Once a day" />
            <option value="Carrot Oil" />
            <option value="After Sun" />
            <option value="Deep tan" />
            <option value="Monoi Tahiti" />
            <option value="Anti Bacterial" />
            <option value="UVA Protection" />
            <option value="Water resistant" />
            <option value="8 Hours Protection" />
          </datalist>

          <button
            type="submit"
            className="search-menu-button search-icon"
            onClick={(e) => search(e)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="container mt-6">{results}</div>
    </div>
  );
}
