import {BASE_URL} from '../../constants/servicesConstants/index'

const errorHandler = response => {
  const {status, statusText} = response

  if (response) {
    return Promise.reject({status, statusText})
  }
}

const get = async ({endpoint, baseURL = BASE_URL}) => {
  const timeout = 80000
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const response = await fetch(`${baseURL}${endpoint}`, {
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

const post = async ({endpoint, data}) => {
  const timeout = 8000
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const response = await window.fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    timeout: 8000,
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.ok) {
    clearTimeout(id)
    return Promise.resolve(await response.json())
  }
  clearTimeout(id)
  return errorHandler(response)
}

const patch = async ({endpoint, data}) => {
  const timeout = 8000
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const response = await window.fetch(`${BASE_URL}${endpoint}`, {
    method: 'PATCH',
    timeout: 8000,
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (response.ok) {
    clearTimeout(id)
    return Promise.resolve(await response.json())
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
