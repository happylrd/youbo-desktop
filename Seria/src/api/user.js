import axios from 'axios'
import { BASE_URL } from './config'
import querystring from 'querystring'

export function saveUser (username, password, nickname) {
  const url = BASE_URL + 'users'

  return axios.post(url, querystring.stringify({
    username: username,
    password: password,
    nickname: nickname
  }))
    .then(res => {
      return Promise.resolve(res.data)
    })
}

export function updateInfo (userId, nickname, realname, gender, description) {
  const url = BASE_URL + 'users/' + userId

  return axios.put(url, querystring.stringify({
    nickname: nickname,
    realname: realname,
    gender: gender,
    description: description
  }))
    .then(res => {
      return Promise.resolve(res.data)
    })
}

export function getUser (username) {
  const url = BASE_URL + 'users/' + username

  return axios.get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}

export function listMyTweet (username) {
  const url = BASE_URL + 'users/' + username + '/tweets'

  return axios.get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
}
