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
  user1: {
    userName: 'qiqi',
    profile: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/jon-snow-rhaegar-targaryen-1554321615.jpg?crop=0.482xw:0.962xh;0,0&resize=480:*'
  }
}));

export default ownerProfileStore