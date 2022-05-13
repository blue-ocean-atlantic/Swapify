import React, { useState, useEffect } from 'react';
import { Map, Marker } from "pigeon-maps";
import test_searchResults from './testdata';
import { Grid, SimpleGrid, Space, ScrollArea } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import ListingCard from '../Home/ListingCard/ListingCard.jsx'; // if home page cards includes zipcode & dist to center, use these
// otherwise, use these
// import ListingCard from './ListingCard.jsx';
import { useScrollIntoView } from '@mantine/hooks';
import NavBar from '../../components/NavBar/NavBar.jsx';
import axios from 'axios';

function SearchResults(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [selected_marker, setSelected_marker] = useState(null);
  const [mapCen, setMapCen] = useState([0, 0]);
  const [query, setQuery] = useState('');
  const [zipcode, setZipcode] = useState('');


  const selectedMarker = (zipcode) => {
    // console.log(zipcode)
    setSelected_marker(zipcode);
  };

  useEffect(() => {
    // const func = async () => {

    // }
    // obtain query, zipcode center, radius from center from url parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setQuery(urlParams.get('query'));
    setZipcode(urlParams.get('zipcode')); // || midpoint from cards
    const radius = urlParams.get('radius') || 5; // check, or hardcode const radius = 5

    axios.get('/api/listings', {
      params: {
        query, zipcode, radius
      }
    })
    .then(response => console.log('good here: ', response));
    
    // filter to only include posts within radius
    var filtered = test_searchResults.results.filter(post => post.distance < radius);
    var postList = filtered.sort((a, b) => { return (a.distance - b.distance) });

    let distances = [];
    postList.forEach(post => {
      let obj = {};
      obj.title = post.title;
      obj.lat = post.lat;
      obj.lng = post.lng;
      obj.distance = Math.sqrt(Math.pow(post.lat, 2) + Math.pow(post.lng, 2));
      distances.push(obj);
    })
    let sortedDist = distances.sort((a, b) => { return (a.distance - b.distance) });

    let center = [];
    center[0] = (sortedDist[0].lat + sortedDist[sortedDist.length - 1].lat) / 2;
    center[1] = (sortedDist[0].lng + sortedDist[sortedDist.length - 1].lng) / 2;
    setSearchResults(postList);
    setMapCen(center);
    // console.log('mapCen: ', mapCen);
  }, []);

  // listing_id

  return (
    <>
      <NavBar />
      <main>
        <Space h={50} />
        <div className='search_container'>
          <div>
            <div className='search_title'>
              <h3>You searched for: "{query}" near {zipcode}</h3>
              {searchResults.length > 0 ?
                `There are ${searchResults.length} matches` :
                'There are no matches for your search query.'}
            </div>
            <Grid gutter="lg" columns={12} justify="center">
              <Grid.Col span={8}>
                <div className='map' >
                  <Map
                    // height={500}
                    center={mapCen}
                    defaultZoom={10}>
                    {searchResults.map((post) =>
                      <Marker
                        id={'marker_' + post.listing_id}
                        key={uuidv4()}
                        width={50}
                        anchor={[post.lat, post.lng]}
                        hover={true}
                        onClick={() => selectedMarker(post.zipcode)}
                      />)
                    }
                  </Map>
                </div>
                {selected_marker ? `zip: ${selected_marker}` : null}
              </Grid.Col>
              <Grid.Col span={4}>
                <div className='scroll' >
                  <ScrollArea style={{ height: 700 }}>
                    <Grid columns={3} gutter="xl" justify="center">
                      <Grid.Col span={3}>
                        {searchResults.map((listing) => (
                          <ListingCard displayLocation key={uuidv4()} listing={listing} />
                        ))}
                      </Grid.Col>
                    </Grid>
                  </ScrollArea>
                </div>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      </main>
    </>
  )
}

export default SearchResults;

/*
<Map
              height={700}
              center={this.state.mapCen}
              zoom={this.state.zoom}
              onBoundsChanged={({ center, zoom }) => this.setState({ mapCen: center, zoom: zoom })}
              {this.state.searchResults.map((post) =>
                <Marker
                  key={uuidv4()}
                  width={50}
                  anchor={[post.lat, post.lng]}
                  onClick={() => { this.selectedMarker(post) }}
                />)
              }>
            </Map>


            <Map
              height={700}
              defaultCenter={this.state.mapCen}
              defaultZoom={12}>
              {this.state.searchResults.map((post) =>
                <Marker
                  key={uuidv4()}
                  width={50}
                  anchor={[post.lat, post.lng]}
                  onClick={() => { this.selectedMarker(post) }}
                />)
              }
            </Map>




// use dummy data to simulate rendered list of searched items on map
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
      qualified_zips_map[nearby_zip_obj.zip_code] = { value: nearby_zip_obj.zip_code, distance: nearby_zip_obj.distance };

    }
    // console.log("qualified_zips_map: ", qualified_zips_map)

    // const query_matches_within_radius = LIST_A.filter(post => qualified_zips_map[post.zipcode]);
    // this.setState({ query_matches_within_radius: query_matches_within_radius });
    // console.log('query_matches_within_radius: ', query_matches_within_radius)
    var reduced = LIST_A.reduce(function (filtered, option) {
      if (qualified_zips_map[option.zipcode]) {
        var post = { ...option, distance: qualified_zips_map[option.zipcode].distance }
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
    this.setState({ dummy_zip_to_coordinates })
    // console.log('dummy_zip_to_coordinates: ', dummy_zip_to_coordinates)
    */