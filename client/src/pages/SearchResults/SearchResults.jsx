import * as React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// import AddLocationIcon from '@mui/icons-material/AddLocation';
// import StarRateIcon from '@mui/icons-material/StarRate';
// import './index.css';
// import axios from 'axios';
// import { format } from 'timeago.js';

// import mapboxgl from '!mapbox-gl';

// console.log(process.env)

import retrivekey from './key.js'

function SearchResults() {
  const [viewState, setViewState] = React.useState({
    longitude: -105.6836,
    latitude: 40.3428,
    zoom: 4
  });

  return (
    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={retrivekey()}
    ></Map>
  );
}

export default SearchResults;

// REACT_APP_MAPBOX_ACCESS_TOKEN
// mapboxAccessToken='pk.eyJ1IjoiYWNlYTY4IiwiYSI6ImNsMnpqNjl6cjA3ZjkzaW1vajdqcHJvbXUifQ.opfRcdWe4DrzulGDpEVUWw'
// mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
