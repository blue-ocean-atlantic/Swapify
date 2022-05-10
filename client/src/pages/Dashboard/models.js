
const getUnreadNumber = function (data) {
  //create counter
  console.log(data)
  let counter = 0;
  // iterate over all chats
  data.forEach((chat) => {
    // check if chat.unread is true
    if (chat.unread === true) {
      // add one to counter
      counter++;
    }
  });
  return counter;
}

module.exports = {
  getUnreadNumber
}