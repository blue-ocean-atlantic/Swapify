import React from 'react';

function NewListing() {
  return <div></div>;
}

export default NewListing;

const request = '/api/listings'; // POST
// Should an authorization header be sent as well to make sure a listing can
// be made only when a user is logged in? (i.e. nobody can create a listing
// using only someone's ID/username)
const body = {
  user_id: String,
  title: String,
  description: String,
  type: String, // swap or trade
  images: [String, String], // should be imagekit.io urls, I'll figure out how to get that functionality to work
  avaiable_date: String, // timecode -- backend team can decide what format exactly
  created_date: String, // timecode -- maybe this is better generated on the backend? i.e. I wouldn't send it, you'd generate it upon DB write
};
