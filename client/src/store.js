// import { set } from 'express/lib/application';
import create from 'zustand';

// const detailsStore = create((set, get) => ({
//   loggedIn: false,
//   setLoggedIn: (val) => set({ loggedIn: val }),
// }));

// // another page

// // import store

// const setStatus = detailsStore(state => state.setLoggedIn)
// setStatus(true)

const ownerProfileStore = create((set, get) => ({
  ownerProfile: {},
  updateOwnerProfile: (val) => set({ ownerProfile: val }),
  // ownerProfile: {
  //   toUserName: 'kun',
  //   toUserProfile: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
  // },
  user1: {
    userName: 'qiqi',
    profile: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80'
  }
}));

export default ownerProfileStore