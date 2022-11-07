import {get, post, patch} from 'utils'

const postContactUsSubmit = data => {
  return post({endpoint: 'web/contact-us/', data})
}

const getCollectionBanner = slug => {
  return get({endpoint: `web/slider/?slug=${slug}`})
}

const getCollection = collection => {
  return get({endpoint: `products/collections/${collection}/`})
}

const getSearchData = params => {
  return get({endpoint:`web/search/?q=${params}`})
}

export {postContactUsSubmit, getCollectionBanner, getCollection, getSearchData}
