// const request = '/results?query=[search_query]'; // GET
// const body = [{
//  user_id: String,
//  title: String,
//  description: String,
//  type: String, // “swap” or “trade”
//  images: [String, String], // should be imagekit.io urls, I'll figure out how to get that functionality to work
//  avaiable_date: String, // timecode -- backend team can decide what format exactly
//  created_date: String, // timecode -- maybe this is better generated on the backend? i.e. I wouldn't send it, you'd generate it upon DB write
//  zipcode: Integer
//  location: [Integer, Integer] // [latitude, longitude]
// },
// {...},
// ...];

const test_searchResults = {
  results: [
    {
      listing_id: 1,
      type: 'swap', // "swap" or "favor"
      title: 'Swivel Chair',
      description:
        "This is a chair in good condition, I bought it a while ago but don't need it anymore. Open to see what you want to trade!",
      image_url:
        'https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2861&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78758,
    },
    {
      listing_id: 2,
      type: 'favor', // "swap" or "favor"
      title: 'chair Removal',
      description:
        'I just really like snakes and am willing to get them off your porch, car, or any other location... Nothing wanted in return besides the snake.',
      image_url:
        'https://images.unsplash.com/photo-1472645977521-95bbf4f0a748?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78758,
      distance: 0.78, // changes based on user location
      longitude: 32.0478,
      latitude: -97.34,
    },
    {
      listing_id: 3,
      type: 'favor', // "swap" or "favor"
      title: 'chair repair',
      description:
        "I'm really good at fixing cars. I'm also a great kisser but don't tell my mom. I don't want to relive what happened last time.",
      image_url:
        'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78708,
    },
    {
      listing_id: 4,
      type: 'swap', // "swap" or "favor"
      title: 'big dog chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78702,
    },
    {
      listing_id: 5,
      type: 'swap', // "swap" or "favor"
      title: 'little chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78704,
    },
    {
      listing_id: 6,
      type: 'swap', // "swap" or "favor"
      title: 'fish chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78742,
    },
    {
      listing_id: 7,
      type: 'favor', // "swap" or "favor"
      title: 'hair chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78741,
    },
    {
      listing_id: 8,
      type: 'swap', // "swap" or "favor"
      title: 'office chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78741,
    },
    {
      listing_id: 9,
      type: 'swap', // "swap" or "favor"
      title: 'small chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78747,
    },
    {
      listing_id: 10,
      type: 'favor', // "swap" or "favor"
      title: 'sittingchair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78748,
    },
    {
      listing_id: 11,
      type: 'swap', // "swap" or "favor"
      title: 'fake chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78640,
    },
    {
      listing_id: 12,
      type: 'swap', // "swap" or "favor"
      title: 'fake2 chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78610,
    },
    {
      listing_id: 13,
      type: 'favor', // "swap" or "favor"
      title: 'hair2 chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78612,
    },
    {
      listing_id: 14,
      type: 'swap', // "swap" or "favor"
      title: 'massage chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78652,
    },
    {
      listing_id: 15,
      type: 'swap', // "swap" or "favor"
      title: 'small3 chair',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78617,
    },
    {
      listing_id: 16,
      type: 'favor', // "swap" or "favor"
      title: 'sittingchair2',
      description:
        "I have a golden retriever that I just can't keep anymore. Looking to trade for a cat, any breed should be ok but chat with me first",
      image_url:
        'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      user_id: 'joshandromidas@gmail.com', // Should be same as email I think
      user_avatar_url:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
      zipcode: 78739,
    },
  ],
};

export default test_searchResults;