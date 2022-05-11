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
}));

export default ownerProfileStore;