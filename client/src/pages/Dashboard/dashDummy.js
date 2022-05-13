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

const active = [
  {
    post_id: 1,
    title: "boulder",
    message: "That's a nice boulder",
    images: [
      {
        thumbnail_url: "https://s.hdnux.com/photos/01/17/42/23/20849873/3/ratio3x2_1200.jpg"
      },
      {
        thumbnail_url: "https://cdn.mos.cms.futurecdn.net/PabJFgLVqABki76HHvPY7P-970-80.jpg.webp"
      }
    ]
  }
]

const given = [
  {
    listing_id: 2,
    title: "lamp",
    description: "Legend says there's a genie inside",
    rating: 2,
    image_urls: [
      "https://m.media-amazon.com/images/I/716pdiOH2uL._AC_SX679_.jpg",
      "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/The_Genie_Aladdin.png/220px-The_Genie_Aladdin.png"
    ]
  }
]

const received = [
  {
    post_id: 3,
    title: "puppy love",
    message: "Who doesn't love a puppy?",
    rating: 5,
    images: [
      {
        thumbnail_url: "https://www.readersdigest.ca/wp-content/uploads/2013/03/6-facts-to-know-before-owning-a-puppy.jpg?w=1000"
      },
      {
        thumbnail_url: "https://myvetanimalhospital.com.au/wp-content/uploads/2020/05/18-1080x675.jpg"
      }
    ]
  }
]


module.exports = {
  chats,
  active,
  given,
  received
}