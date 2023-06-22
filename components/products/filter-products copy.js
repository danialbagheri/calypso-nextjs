import _ from 'lodash'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function FilterProducts(props) {
  const limit = 2
  function sortLimit(filteredProducts) {
    if (limit <= filteredProducts.length) {
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
    const filteredProducts = props.products.filter(product => {
      if (productType != '') {
        return _.find(product.types, function (o) {
          return o.name == productType
        })
      }
      return product
    })
    props.setProducts(filteredProducts)
    sortLimit(filteredProducts)
  }
  function filterByProperties(value) {
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
    props.sortLimit(filteredProducts)
  }
  return (
    <>
      <div className="col-md-3 col-12 col-xs-12 mt-1 mb-1 col-sm-6 product-page-filter-item">
        <span className="ml-2">
          Showing {props.limit} of {props.products.length} results.
        </span>
      </div>
      <div className="col-md-3 col-12 col-xs-12 mt-1 mb-1 col-sm-6 product-page-filter-item">
        <label>Categories</label>
        <select
          className="form-select product-page-select"
          onChange={e => filterProductsByCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="Sun protection">Sun Protection</option>
          <option value="After Sun">After Sun</option>
          <option value="Kids">Kids</option>
          <option value="Tanning">Tanning</option>
          <option value="Health Care">Health Care</option>
        </select>
      </div>
      <div className="col-md-3 col-12 col-xs-12 col-sm-5 mt-1 mb-1 product-page-filter-item">
        <label className="ml-2">Filter By</label>
        <select
          aria-label="Filter by"
          className="form-select"
          onChange={e => filterByProperties(e.target.value)}
        >
          <optgroup label="SPF">
            <option value="SPF 10">10</option>
            <option value="SPF 15">15</option>
            <option value="SPF 30">30</option>
            <option value="SPF 40">40</option>
            <option value="SPF 50">50+</option>
          </optgroup>
          {/* <optgroup label="Sizes">
                  <option value="Size 100">100ml</option>
                  <option value="Size 150">150ml</option>
                  <option value="Once A Day">Once A Day</option>
                  <option value="40">Silicon Free</option>
                  <option value="50">Monoi Tahiti</option>
                </optgroup> */}
        </select>
      </div>
      <div className="col-md-2 col-12 col-xs-12 mt-1 col-sm-5 mb-1 product-page-filter-item">
        <label className="ml-2">Show</label>
        <select
          aria-label="Select Product Shown per page"
          className="form-select mr-2"
          onChange={e => props.setLimit(parseInt(e.target.value))}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="col-md-1 col-12 col-xs-12 mt-1 mb-1 col-sm-2 product-page-filter-item">
        <Link href="/search/">
          <button aria-label="Search" className="product-page-search">
            <FontAwesomeIcon className="product-page-search" icon={faSearch} />
          </button>
        </Link>
      </div>
    </>
  )
}
