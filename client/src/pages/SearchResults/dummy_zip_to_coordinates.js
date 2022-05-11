// converts 78708,78702,78704,78741 into an object
// with the coordinates information from API: US Location to Zip Codes

// results from making api to
/* Request URL https://www.zipcodeapi.com/rest/DemoOnly00zc1n3hBdzpEyvZoSEzg32mXbwnEPKGfOGVPQSLpuD9BFxxPX8yw1ze/multi-info.json/78708%2C78702%2C78704%2C78741/degrees
*/

const coordinates = {
  "78702": {
    "zip_code": "78702",
    "lat": 30.26,
    "lng": -97.71,
    "city": "Austin",
    "state": "TX",
    "timezone": {
        "timezone_identifier": "America/Chicago",
        "timezone_abbr": "CDT",
        "utc_offset_sec": -18000,
        "is_dst": "T"
    },
    "acceptable_city_names": [],
    "area_codes": [
        512
    ]
},
  "78704": {
      "zip_code": "78704",
      "lat": 30.24,
      "lng": -97.76,
      "city": "Austin",
      "state": "TX",
      "timezone": {
          "timezone_identifier": "America/Chicago",
          "timezone_abbr": "CDT",
          "utc_offset_sec": -18000,
          "is_dst": "T"
      },
      "acceptable_city_names": [
          {
              "city": "Travis Heights",
              "state": "TX"
          }
      ],
      "area_codes": [
          512
      ]
  },
  "78708": {
      "zip_code": "78708",
      "lat": 30.26,
      "lng": -97.73,
      "city": "Austin",
      "state": "TX",
      "timezone": {
          "timezone_identifier": "America/Chicago",
          "timezone_abbr": "CDT",
          "utc_offset_sec": -18000,
          "is_dst": "T"
      },
      "acceptable_city_names": [],
      "area_codes": [
          512
      ]
  },
  "78741": {
      "zip_code": "78741",
      "lat": 30.23,
      "lng": -97.71,
      "city": "Austin",
      "state": "TX",
      "timezone": {
          "timezone_identifier": "America/Chicago",
          "timezone_abbr": "CDT",
          "utc_offset_sec": -18000,
          "is_dst": "T"
      },
      "acceptable_city_names": [
          {
              "city": "Montopolis",
              "state": "TX"
          }
      ],
      "area_codes": [
          512
      ]
  }
}

export default coordinates;
