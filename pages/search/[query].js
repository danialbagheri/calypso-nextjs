import { useState, useEffect } from "react";
import data from "../../data.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchResultElements from "components/general/SearchResultElements/SearchResultElements";
import * as ga from "../../components/common/googleAnalytics";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Searched() {
  const router = useRouter();
  const [searchVal, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [searchResultCount, setSearchResultCount] = useState(null);

  function handleChange(e) {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setSearchValue("");
      setSearchResult("");
      setSearchResultCount(0);
    }
  }

  const search = (e = null) => {
    const baseUrl = data.apiUrl;
    let endPoint;
    if (e) {
      e.preventDefault();
      endPoint = `${baseUrl}web/search/?q=${searchVal}`;
    } else {
      const { query } = router.query;
      // setSearchValue(query);
      console.log(query);
      endPoint = `${baseUrl}web/search/?q=${query}`;
    }
    setLoading(true);
    fetch(endPoint)
      .then((response) => response.json())
      .then((result) => {
        setSearchValue("");
        setLoading(false);
        setSearchResult(result.results);
        setSearchResultCount(result.count);
      });
    ga.event({
      action: "search",
      params: {
        search_term: searchVal,
      },
    });
  };
  function searchOnEnter(e) {
    if (e.key === "Enter") {
      search(e);
    }
  }
  useEffect(() => {
    search();
  }, []);

  let results;
  if (loading) {
    results = (
      <div className="mt-6">
        <div className="calypso-orange loading-spinner centre" />
        <p className="text-centre">Loading</p>
      </div>
    );
  } else if (searchResultCount >= 1) {
    results = searchResult.map((p) => (
      <SearchResultElements product={p} key={p.id} />
    ));
  } else if (searchResultCount == 0) {
    results = <span>Nothing found</span>;
  } else {
    results = <span></span>;
  }

  return (
    <div className="search-page">
      <Head>
        <title>Calypso - Search</title>
      </Head>
      <div className="search-container">
        <div className="search-box" id="search-form">
          <button
            className="search-menu-button search-icon"
            type="button"
            onClick={() => router.back()}
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

          <button
            type="submit"
            className="search-menu-button search-icon"
            onClick={(e) => search(e)}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="container mt-6" >
        {results}
      </div>
    </div>
  );
}
