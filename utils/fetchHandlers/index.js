import {BASE_URL} from '../../constants/servicesConstants/index'

const errorHandler = response => {
  if (response) {
    return Promise.reject(`${response.statusText}`)
  }
}

const get = ({endpoint, baseURL = BASE_URL}) => {
  return fetch(`${baseURL}${endpoint}`).then(async response => {
    if (+response.status < 400) {
      return Promise.resolve(await response.json())
    } else {
      return errorHandler(response)
    }
  })
}

const post = ({endpoint, data, abortController}) =>
  window
    .fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      signal: abortController ? abortController.signal : undefined,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(async response => {
      if (response.ok) {
        return Promise.resolve(await response.json())
      } else {
        return errorHandler(response)
      }
    })

const patch = ({endpoint, data, abortController}) =>
  window
    .fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      signal: abortController ? abortController.signal : undefined,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(async response => {
      if (response.ok) {
        return Promise.resolve(await response.json())
      } else {
        return errorHandler(response)
      }
    })

const nextPost = ({endpoint, data, abortController}) => {
  return window.fetch(endpoint, {
    method: 'POST',
    signal: abortController ? abortController.signal : undefined,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
}

export {get, post, patch, nextPost}
