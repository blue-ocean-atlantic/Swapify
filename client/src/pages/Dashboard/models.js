
const getUnreadNumber = function (data) {
  console.log(data)
  let counter = 0;
  data.forEach((chat) => {
    if (chat.unread === true) {
      counter++;
    }
  });
  return counter;
}

module.exports = {
  getUnreadNumber
}