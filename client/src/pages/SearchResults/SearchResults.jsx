import React from 'react';
import { Map, Marker } from "pigeon-maps";
import test_searchResults from './dummy_searchResults';
import dummy_78701_5 from './dummy_78701_5';
import dummy_zip_to_coordinates from './dummy_zip_to_coordinates';
import { Grid, SimpleGrid, Space, ScrollArea } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import ListingCard from '../Home/ListingCard/ListingCard.jsx';

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      query_matches_within_radius:[],
      dummy_zip_to_coordinates:{},
      selected_marker:null
    };
    this.selectedMarker = this.selectedMarker.bind(this)
  }

  selectedMarker = (zip) => {
    // console.log("clicked marker!!!!", zip)
    this.setState({ selected_marker: zip });
 };

  componentDidMount() {
    // if ("geolocation" in navigator) {
    //   console.log("Available");
    // } else {
    //   console.log("Not Available");
    // }
    // navigator.geolocation.getCurrentPosition(function(position) {
    //   console.log("getting lat and long")
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);
    //   });
    const queryString = window.location.search;
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get('query')
    // console.log(query);
    const zipcode = urlParams.get('zipcode')
    // console.log(zipcode);
    const radius = urlParams.get('radius')
    // console.log(radius);

    // LIST_A: make db call for search query (regardless of radius) ex. 'chair'
    const LIST_A = test_searchResults.results;
    // console.log('dummy data: ', test_searchResults.results);
    // axios.get(`/searchresults`, { queryParams: query })
    //   .then((response) => {
    //     this.setState({searchResults: response.data.body.params}) // fix this syntax
    //   })

    // LIST_B: make query to "US Zip codes by radius" API from zipcodeapi.com
    // https://www.zipcodeapi.com/API#radius
    // obtains list of all zipcodes relevant to user (filtered by radius/distance)
    // const zipcodeapidotcom_key = 'insert your API key here';
    // axios.get(`https://www.zipcodeapi.com/rest/${zipcodeapidotcom_key}/radius.json/${zipcode}/${radius}/mile`)
    //   .then((response) => {
    //     this.setState({ nearbyzipcodes: response.data.body.params }) // fix this syntax
    //   })
    const LIST_B = dummy_78701_5.zip_codes;
    // console.log('78701 nearby zips, 5mi: ', dummy_78701_5.zip_codes);

    // filter LIST_A using LIST_B to obtain list of zipcodes that match a post within radius + zipcode entered

    // filter Using Map
    const qualified_zips_map = {};
    for(const nearby_zip_obj of LIST_B){
      qualified_zips_map[nearby_zip_obj.zip_code] = true;
    }
    const query_matches_within_radius = LIST_A.filter(post => qualified_zips_map[post.zipcode]);
    this.setState({ query_matches_within_radius: query_matches_within_radius })
    // console.log('query_matches_within_radius: ', query_matches_within_radius);

    // convert all relevant zipcodes to lat and long in prep to make markers on map
    // this can be done by using the zipcodeapi.com "Multiple US Zip Codes to Location Information API"
    // const zipcodeapidotcom_key = 'insert your API key here';
    // axios.get(`https://www.zipcodeapi.com/rest/${zipcodeapidotcom_key}/multi-info.json/78708%2C78702%2C78704%2C78741/degrees
    //   .then((response) => {
    //     this.setState({ coodinates: response.data.body.params }) // fix this syntax
    //   })
    // console.log("dummy_zip_to_coordinates: ", dummy_zip_to_coordinates)
    this.setState({ dummy_zip_to_coordinates })

  };


  render() {
    return (
      <>
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Grid gutter="lg" columns={12} justify="center">
          <Grid.Col span={6}>
            <Map height={500} defaultCenter={[30.2634, -97.714517]} defaultZoom={10}>
              {Object.keys(dummy_zip_to_coordinates).map((coordinate) => {
                const uu_id = uuidv4()
                return (
                <Marker
                  key={uu_id}
                  width={50}
                  anchor={[dummy_zip_to_coordinates[coordinate].lat, dummy_zip_to_coordinates[coordinate].lng]}
                  onClick={() => {this.selectedMarker(coordinate)}}
                /> )
              })}
            </Map>
            {this.state.selected_marker ? `zip: ${this.state.selected_marker}` : null}
          </Grid.Col>
          <Grid.Col span={3}>
            <ScrollArea style={{ height: 500 }}>
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
    )
  }
}

export default SearchResults;