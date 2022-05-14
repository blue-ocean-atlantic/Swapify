import React from 'react';
import { Map, Marker } from 'pigeon-maps';
import test_searchResults from './dummy_searchResults';
import dummy_78701_5 from './dummy_78701_5';
import dummy_zip_to_coordinates from './dummy_zip_to_coordinates';
import { Grid, SimpleGrid, Space, ScrollArea } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
// import ListingCard from '../Home/ListingCard/ListingCard.jsx'; // if home page cards includes zipcode & dist to center, use these
// otherwise, use these
import ListingCard from './ListingCard.jsx';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      query_matches_within_radius: [],
      dummy_zip_to_coordinates: {},
      selected_marker: null,
    };
    this.selectedMarker = this.selectedMarker.bind(this);
  }

  selectedMarker = (zip) => {
    this.setState({ selected_marker: zip });
  };

  componentDidMount() {
    // obtain query, zipcode center, radius from center from url parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('query');
    const zipcode = urlParams.get('zipcode');
    const radius = urlParams.get('radius');

    // use dummy data to simulate map feature & list of searched items
    // LIST_A: make db call for search query (regardless of radius) ex. 'chair'
    const LIST_A = test_searchResults.results;
    // console.log("LIST_A", LIST_A)
    // will swap to db call once db is populated with items
    // axios.get(`/searchresults`, { queryParams: query })
    //   .then((response) => {
    //     this.setState({searchResults: response.data.body.params}) // fix this syntax
    //   })

    // obtains list of all zipcodes relevant to user (filtered by radius/distance)
    // LIST_B: make query to "US Zip codes by radius" API from zipcodeapi.com
    const LIST_B = dummy_78701_5.zip_codes;
    // will swap to db call once db is populated with items
    // https://www.zipcodeapi.com/API#radius
    // const zipcodeapidotcom_key = 'insert your API key here';
    // axios.get(`https://www.zipcodeapi.com/rest/${zipcodeapidotcom_key}/radius.json/${zipcode}/${radius}/mile`)
    //   .then((response) => {
    //     this.setState({ nearbyzipcodes: response.data.body.params }) // fix this syntax
    //   })

    // filter LIST_A using LIST_B to obtain list of zipcodes that match a post within radius + zipcode entered
    // filter Using Map
    const qualified_zips_map = {};
    for (const nearby_zip_obj of LIST_B) {
      // qualified_zips_map[nearby_zip_obj.zip_code] = True;
      qualified_zips_map[nearby_zip_obj.zip_code] = {
        value: nearby_zip_obj.zip_code,
        distance: nearby_zip_obj.distance,
      };
    }
    // console.log("qualified_zips_map: ", qualified_zips_map)

    // const query_matches_within_radius = LIST_A.filter(post => qualified_zips_map[post.zipcode]);
    // this.setState({ query_matches_within_radius: query_matches_within_radius });
    // console.log('query_matches_within_radius: ', query_matches_within_radius)
    var reduced = LIST_A.reduce(function (filtered, option) {
      if (qualified_zips_map[option.zipcode]) {
        var post = {
          ...option,
          distance: qualified_zips_map[option.zipcode].distance,
        };
        filtered.push(post);
      }
      return filtered;
    }, []);
    this.setState({ query_matches_within_radius: reduced });
    // console.log('query_matches_within_radius: ', reduced)

    // convert all relevant zipcodes to lat and long in prep to make markers on map
    // this can be done by using the zipcodeapi.com "Multiple US Zip Codes to Location Information API"
    // const zipcodeapidotcom_key = 'insert your API key here';
    // axios.get(`https://www.zipcodeapi.com/rest/${zipcodeapidotcom_key}/multi-info.json/78708%2C78702%2C78704%2C78741/degrees
    //   .then((response) => {
    //     this.setState({ coodinates: response.data.body.params }) // fix this syntax
    //   })
    this.setState({ dummy_zip_to_coordinates });
    // console.log('dummy_zip_to_coordinates: ', dummy_zip_to_coordinates)
  }

  render() {
    // find out default zoom to be based on furthest item locations
    // (audjustable/dynamically render default zoom)
    return (
      <>
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Grid gutter="lg" columns={12} justify="center">
          <Grid.Col span={6}>
            <Map
              height={700}
              defaultCenter={[30.2634, -97.714517]}
              defaultZoom={12}
            >
              {Object.keys(dummy_zip_to_coordinates).map((coordinate) => {
                const uu_id = uuidv4();
                return (
                  <Marker
                    key={uu_id}
                    width={50}
                    anchor={[
                      dummy_zip_to_coordinates[coordinate].lat,
                      dummy_zip_to_coordinates[coordinate].lng,
                    ]}
                    onClick={() => {
                      this.selectedMarker(coordinate);
                    }}
                  />
                );
              })}
            </Map>
            {this.state.selected_marker
              ? `zip: ${this.state.selected_marker}`
              : null}
          </Grid.Col>
          <Grid.Col span={3}>
            <ScrollArea style={{ height: 700 }}>
              Matches:
              <SimpleGrid cols={1} spacing="xl">
                {this.state.query_matches_within_radius.map((listing) => (
                  <ListingCard key={uuidv4()} listing={listing} />
                ))}
              </SimpleGrid>
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </>
    );
  }
}

export default SearchResults;
