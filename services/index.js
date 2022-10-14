import {get, post, patch} from '../utils'

const postContactUsSubmit = data => {
  return post({endpoint: 'web/contact-us/', data})
}

const getCollectionBanner = slug => {
  return get({endpoint: `web/slider/?slug=${slug}`})
}

const getCollection = collection => {
  return get({endpoint: `products/collections/${collection}/`})
}

export {postContactUsSubmit, getCollectionBanner, getCollection}
