import axios from 'axios'
import { BASE_URL } from './config'
import querystring from 'querystring'

export function saveTweet (content, userId) {
  const url = BASE_URL + 'tweets'

  return axios.post(url, querystring.stringify({
    content: content,
    user: userId
  }))
    .then(res => {
      return Promise.resolve(res.data)
    })
}

export function listTweet () {
  const url = BASE_URL + 'tweets'

  return axios.get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
