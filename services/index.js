import {get, post, patch} from '../utils'

const postContactUsSubmit = data => {
  console.log('HERE::::')
  return post({endpoint: 'web/contact-us/', data})
}

export {postContactUsSubmit}
