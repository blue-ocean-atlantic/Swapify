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



// export default getChatInfo;