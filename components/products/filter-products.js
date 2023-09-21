import {useEffect, useState} from 'react'
import _ from 'lodash'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Styles from '../../styles/filterProducts.module.css'
import {useRouter} from 'next/router'

export default function FilterProducts(props) {
  const router = useRouter()
  const topProductFilters = [
    'All',
    'Sun Protection',
    'After Sun',
    'Kids',
    'Tanning',
    'Health Care',
  ]
  const [topProductFiltersLimit, setTopProductFiltersLimit] = useState(6)
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [category, setCategory] = useState(router.query.category || 'All')
  const [filterToggle, SetFilterToggle] = useState(false)
  const [dropDownToggle, setDropDownToggle] = useState(true)
  const [spfDropDownToggle, setSpfDropDownToggle] = useState(false)
  const [productsToShowDropDownToggle, setProductsToShowDropDownToggle] =
    useState(false)

  function sortLimit(filteredProducts) {
    if (props.limit <= filteredProducts.length) {
      if (filteredProducts.length > 10) {
        props.setLimit(10)
        props.setMaxLimit(false)
      } else {
        props.setLimit(filteredProducts.length)
        props.setMaxLimit(true)
      }
    } else {
      props.setLimit(filteredProducts.length)
      props.setMaxLimit(true)
    }
  }
  function filterProductsByCategory(productType) {
    setSelectedFilter(productType)
    const filteredProducts = props.products.filter(product => {
      if (productType != 'All') {
        return _.find(product.types, function (o) {
          return o == productType
        })
      }
      return props.products
    })
    props.setProducts(filteredProducts)
    props.setLimit(filteredProducts.length)
  }

  function filterByProperties(value) {
    setSelectedFilter(value)
    const filteredProducts = props.products.filter(product => {
      const variants = _.find(product.variants, function (o) {
        if (o.name == value) {
          product.main_image = o.image_list[0].image // replaces the main image with variant image
          return o
        }
      })
      return variants
    })

    props.setProducts(filteredProducts)
    sortLimit(filteredProducts)
  }
  function clearAllFilters() {
    setSelectedFilter(null)
    setCategory('All')
    props.setLimit(10)
    props.setProducts(props.products)
  }
  useEffect(() => {
    filterProductsByCategory(category)
    const limit = props.limit == 0 ? 10 : props.limit
    router.push(
      `/products?limit=${limit}&category=${encodeURIComponent(category)}`,
      null,
      {
        shallow: true,
      },
    )
  }, [category])

  useEffect(() => {
    function titledCaseConvertor(category) {
      const decodedCat = decodeURIComponent(category).split(' ')
      const titledCase = decodedCat
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return titledCase
    }
    //   checks if conditions are met for category type
    function validatedCategory(category, queryCategory) {
      const titledCase = titledCaseConvertor(queryCategory)
      if (
        topProductFilters.includes(titledCase) &&
        titledCase != category &&
        typeof router.query.category == 'string'
      ) {
        return true
      }
      return false
    }

    validatedCategory(category, router.query.category)
      ? setCategory(titledCaseConvertor(router.query.category))
      : null
    typeof router.query.limit == 'number' && router.query.limit != props.limit
      ? props.setLimit(router.query.limit)
      : null
  }, [router.asPath])

  const filtersDiv = (
    <div className={Styles.slideMenu}>
      <div className="">
        <button
          className={Styles.CloseSlider}
          onClick={() => SetFilterToggle(false)}
        >
          X
        </button>
        <Link href="/search/">
          <button aria-label="Search" className={Styles.OptionsTitle}>
            Search for products{' '}
            <FontAwesomeIcon className={Styles.SearchIcon} icon={faSearch} />
          </button>
        </Link>
        <button
          className={Styles.OptionsTitle}
          onClick={() => setDropDownToggle(!dropDownToggle)}
        >
          Product Categories
        </button>
        <div
          className={Styles.Options}
          style={dropDownToggle ? {display: 'flex'} : {display: 'none'}}
        >
          {topProductFilters.map((item, index) => (
            <button key={index} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="">
        <button
          className={Styles.OptionsTitle}
          onClick={() => setSpfDropDownToggle(!spfDropDownToggle)}
        >
          Filter By SPF
        </button>
        <div
          className={Styles.SPFOptions}
          style={spfDropDownToggle ? {display: 'flex'} : {display: 'none'}}
        >
          <button onClick={() => filterByProperties('SPF 10')}>10</button>
          <button onClick={() => filterByProperties('SPF 15')}>15</button>
          <button onClick={() => filterByProperties('SPF 30')}>30</button>
          <button onClick={() => filterByProperties('SPF 40')}>40</button>
          <button onClick={() => filterByProperties('SPF 50')}>50+</button>
        </div>
      </div>
      <div className="">
        <button
          className={Styles.OptionsTitle}
          onClick={() =>
            setProductsToShowDropDownToggle(!productsToShowDropDownToggle)
          }
        >
          Products to Show
        </button>
        <div
          className={Styles.Options}
          style={
            productsToShowDropDownToggle ? {display: 'flex'} : {display: 'none'}
          }
        >
          <button onClick={() => props.setLimit(parseInt(10))}>10</button>
          <button onClick={() => props.setLimit(parseInt(15))}>15</button>
          <button onClick={() => props.setLimit(parseInt(20))}>20</button>
          <button onClick={() => props.setLimit(parseInt(40))}>40</button>
        </div>
      </div>
      <button
        className={Styles.ApplyFilter}
        onClick={() => SetFilterToggle(false)}
      >
        Apply Filter
      </button>
    </div>
  )
  return (
    <>
      <div className={Styles.Centralize}>
        <div className={Styles.ProductCategories}>
          {topProductFilters
            .slice(0, topProductFiltersLimit)
            .map((item, index) => (
              <button key={index} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          {topProductFiltersLimit < topProductFilters.length ? (
            <button
              onClick={() =>
                setTopProductFiltersLimit(topProductFilters.length)
              }
            >
              Load More
            </button>
          ) : null}
        </div>
        <span>
          Showing {props.limit} of {props.products.length} results.
        </span>
      </div>
      <div className={Styles.FilterWrapper}>
        <button
          className={Styles.FilterButton}
          onClick={() => SetFilterToggle(!filterToggle)}
        >
          Filter
        </button>
        {selectedFilter && selectedFilter != 'All' ? (
          <div className={Styles.SelectedFilterWrapper}>
            Selected filter{' '}
            <div className={Styles.SelectedFilter}>{selectedFilter}</div>
            <button
              className={Styles.ClearButton}
              onClick={() => clearAllFilters()}
            >
              Clear All X
            </button>
          </div>
        ) : null}
      </div>
      <div>
        {filterToggle ? (
          <>
            {filtersDiv}
            <div
              className={Styles.SlideMenuBackground}
              onClick={() => SetFilterToggle(false)}
            ></div>
          </>
        ) : null}
      </div>
    </>
  )
}
