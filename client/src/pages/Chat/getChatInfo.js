import axios from 'axios';


export const getUserLists = (userName) => {
  const options = {
    url: '/userLists',
    method: 'get',
    params: { userName }
  }
  return axios(options)
}

export const getChatInfo = (userName, toUser) => {
  const options = {
    url: '/getChatInfo',
    method: 'get',
    params: { userName, toUser }
  }
  return axios(options)
}

export const addNewToUser = (userName, profile) => {
  console.log(userName, profile)
  const options = {
    url: '/addNewToUser',
    method: 'post',
    params: { userName, profile }
  }
  return axios(options)
}

export const getUserProfiles = (userNames) => {
  const options = {
    url: '/getUserProfiles',
    method: 'get',
    params: { userNames }
  }
  return axios(options)
}
