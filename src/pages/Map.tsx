import { useCallback, useEffect, useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import { useAircraftContext } from '../context/AircraftContext';
import { IDebounce, OSNAPIResponse, AircraftStateArray } from '../types/AircraftTypes';
import { RemoveScroll } from 'react-remove-scroll';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { Box } from '@mui/material';
import AircraftDataCard from '../components/AircraftDataCard';
import 'react-flagpack/dist/style.css'


// Environmental variables declared at top level of the map.

const mapAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const apiUrl = import.meta.env.VITE_OPENSKYNETWORK_API_URL;
const cache: { [key: string]: any } = {};

const debounce = ({ func, wait }: IDebounce): (...args: any[]) => void => {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};



const fetchWithCache = async (url: string): Promise<OSNAPIResponse> => {
  // Check if the response for the given URL is already in the cache
  if (cache[url]) {
    return cache[url];
  }

  // If not in cache, fetch the data from the API
  const response = await fetch(url);
  const data: OSNAPIResponse = await response.json();
  console.log(data, 'response from data');

  // Store the fetched data in the cache with the URL as the key
  cache[url] = data;

  // Return the fetched data
  return data;
};

const MapPage: React.FC = () => {
  
  
  const { aircraftData, updateAircraftData } = useAircraftContext();
  const [ focusedAircraft, setFocusedAircraft] = useState([])



  const fetchData = useCallback(() => {
    fetchWithCache(apiUrl)
      .then((res: any) => {
        updateAircraftData(res);
        console.log('Aircraft Data Console Log', aircraftData);
      })
      .catch((err) => console.error(err));
  }, [apiUrl, updateAircraftData]);

  const filteredAircraft = aircraftData?.states?.filter((aircraft: AircraftStateArray[]) => { 
    const longitude = aircraft[5]
    const latitude = aircraft[6]
    const category = aircraft[17]
    // console.log(`Longitude: ${longitude}, Latitude: ${latitude}, Category: ${category}`);
    return (
      typeof category === 'number' &&
      typeof longitude === 'number' &&
      typeof latitude === 'number' &&
      category >= 1
    )

  })


  useEffect(() => {
    fetchData(); // Call immediately on page load
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 6000); // Call every 6 seconds

    // return () => clearInterval(interval); // Clean up on unmount
  }, [fetchData]);



  return (
    <RemoveScroll>
    <Box width={'100vw'} height={'100vh'} position={'relative'}>
    <h2 style={{position: 'absolute', top: 2, zIndex: 1, left: '2%'}}>Flight Tracker</h2>
      <Map
        mapboxAccessToken={mapAccessToken}
        initialViewState={{
          longitude: -100.0,
          latitude: 45,
          zoom: 3,
        }}
        style={{ width: '100%', height: '80%'}}
        mapStyle="mapbox://styles/mapbox/light-v11"
        maxPitch={0}
        minZoom={1}
        maxZoom={12}
      >
  
        {filteredAircraft?.map((aircraft: any) => {
    const longitude = aircraft[5]
    const latitude = aircraft[6]
    const trueTrack = aircraft[10]

          return (
            <Marker
            latitude={latitude}
            longitude={longitude}
            onClick={() => { setFocusedAircraft(aircraft)
            console.log(focusedAircraft)}}
            >
                <AirplanemodeActiveIcon sx={{ transform: `rotate(${trueTrack}deg)`, cursor: 'pointer' }}/>            </Marker>
          )

        })}
      </Map>
          {/* @ts-ignore */}
          <AircraftDataCard aircraftData={focusedAircraft}/>
      </Box>
      </RemoveScroll>
  );
};

export default MapPage;