import {useState} from 'react'
import data from '../../data.json'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft, faSearch} from '@fortawesome/free-solid-svg-icons'
import SearchResultElements from 'components/general/SearchResultElements/SearchResultElements'

export default function SearchBar({visible, visibilitySetter}) {
  const [searchVal, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState('')
  const [searchResultCount, setSearchResultCount] = useState(null)

  function handleChange(e) {
    setSearchValue(e.target.value)

    if (e.target.value === '') {
      setSearchValue('')
      setSearchResult('')
      setSearchResultCount(0)
    }
  }

  const search = e => {
    e.preventDefault()
    setLoading(true)
    const baseUrl = data.apiUrl
    const endPoint = `${baseUrl}web/search/?q=${searchVal}`
    fetch(endPoint)
      .then(response => response.json())
      .then(result => {
        setSearchValue(null)
        setLoading(false)
        setSearchResult(result.results)
        setSearchResultCount(result.count)
      })
  }
  function searchOnEnter(e) {
    if (e.key === 'Enter') {
      search(e)
    }
  }
  let results
  if (loading) {
    results = (
      <div className="mt-6">
        <div className="calypso-orange loading-spinner centre" />
        <p className="text-centre">Loading</p>
      </div>
    )
  } else if (searchResultCount >= 1) {
    results = searchResult.map((p, i) => (
      <SearchResultElements key={i} product={p} />
    ))
  } else if (searchResultCount == 0) {
    results = <span>Nothing found</span>
  } else {
    results = <span></span>
  }

  return (
    <div
      className={
        visible
          ? 'search-page product-search-page-show'
          : 'product-search-page-hide '
      }
    >
      <div className="search-container">
        <div className="search-box" id="search-form">
          <button
            className="search-menu-button search-icon"
            onClick={() => {
              visibilitySetter(false)
            }}
            type="button"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <input
            className="search-field"
            list="searchOptions"
            name="searchVal"
            onChange={e => handleChange(e)}
            onKeyDown={e => searchOnEnter(e)}
            placeholder="Search our catalogue 🧴 🌞 🏖️"
            value={searchVal}
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
            className="search-menu-button search-icon"
            onClick={e => search(e)}
            type="submit"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div>{results}</div>
    </div>
  )
}
