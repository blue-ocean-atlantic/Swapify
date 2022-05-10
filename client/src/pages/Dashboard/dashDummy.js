// chats

const chats = [
  {
    chat_id: 1,
    sender: "I'm the first sender", //(the username of the person sending the message),
    message: "This is the first senders first message",
    unread: true,
  },
  {
    chat_id: 2,
    sender: "I'm the second sender", //(the username of the person sending the message),
    message: "This is the second senders ONLY message",
    unread: true,
  },
  {
    chat_id: 3,
    sender: "Third sender", // (the username of the person sending the message),
    message: "This is the Third senders message",
    unread: false,
  }
]


// user Information

// {
//   user_id: 1,
//   username: "cynTel",
//   user_first_name: "Cynthia",
//   user_last_name: "Telfair",
//   personal_rating: 0,
// 	profile_image: stringType(url link) // - I’m thinking this should be a default pic until user uploads a personal pic
// }

module.exports = {
  chats,
}