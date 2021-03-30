import React, { useState, useEffect } from "react";
import data from "../../data.json";

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
              <h4 className="text-centre">{p.sub_title}</h4>
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
            className="search-button search-icon"
            onClick={() => {
              visibilitySetter(false);
            }}
            type="button"
          >
            <i className="fas fa-arrow-left" />
          </button>
          <input
            className="search-field"
            name="searchVal"
            value={searchVal}
            placeholder="Start typing. Ask us anything ;)"
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => searchOnEnter(e)}
          />

          <button
            type="submit"
            className="search-button search-icon"
            onClick={(e) => search(e)}
          >
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
      <div className="container mt-6">{results}</div>
    </div>
  );
}
