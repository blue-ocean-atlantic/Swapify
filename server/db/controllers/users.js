const Users = require('../models/users.js');

const findRsvpAndUpdate = (newUser) => {
  const { firstName, lastName, email, userName, zipCode, password } = newUser;
  return Users.find({ firstName, lastName })
    .then(data => {
      if (data.length === 0) {
        return Users.create(rsvp)
      } else {
        return Users.updateOne({ firstName, lastName }, rsvp);
      }
    });
};



module.exports = findRsvpAndUpdate;
