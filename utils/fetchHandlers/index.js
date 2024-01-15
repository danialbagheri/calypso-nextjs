import {BASE_URL} from '../../constants/servicesConstants/index'

// const BASE_URL = 'https://api.cabanasun.co.uk/api/'

const errorHandler = async response => {
  const {status, statusText} = response
  let res = null
  try {
    res = await response.json()
  } catch (e) {
    console.error(e)
    res = null
  }

  if (response) {
    return Promise.reject({status, statusText, res})
  }
}

const get = async ({
  endpoint,
  baseURL = BASE_URL,
  token = null,
  ...headers
}) => {
  const timeout = 80000
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const response = await fetch(`${baseURL}${endpoint}`, {
    method: 'GET',
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      'Content-Type': 'application/json', // Adjust the content type if needed
      // credentials: 'include',
      ...headers,
    },
    timeout: 8000,
    signal: controller.signal,
  })
  if (+response.status < 400) {
    clearTimeout(id)
    return Promise.resolve(await response.json())
  }
  clearTimeout(id)
  return errorHandler(response)
}

const post = async ({endpoint, data, ...headers}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    return Promise.resolve(await response.json())
  }

  return errorHandler(response)
}

const patch = async ({endpoint, data, token = null}) => {
  const timeout = 8000
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const response = await window.fetch(`${BASE_URL}${endpoint}`, {
    method: 'PATCH',
    timeout: 8000,
    signal: controller.signal,
    headers: {
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (response.ok) {
    clearTimeout(id)
    return Promise.resolve(response)
  }
  clearTimeout(id)
  return errorHandler(response)
}

const nextPost = ({endpoint, data}) => {
  return window.fetch(endpoint, {
    method: 'POST',
    signal: undefined,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
}

export {get, post, patch, nextPost}
