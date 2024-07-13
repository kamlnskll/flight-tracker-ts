import { useCallback, useEffect, useMemo, useState } from 'react';
import { Map, Marker } from 'react-map-gl';
import { useAircraftContext } from '../context/AircraftContext';
import { Box } from '@mui/material';
import { AircraftState, AircraftContextProps, AircraftProviderProps, IDebounce, IViewState, OSNAPIResponse } from '../types/AircraftTypes';


// Enviromental variables declared at top level of the map.

const mapAccessToken = import.meta.env.VITE_MAPBOX_TOKEN
const apiUrl = import.meta.env.VITE_OPENSKYNETWORK_API_URL
const cache: { [key: string]: any } = {};



const debounce = ({func, wait}: IDebounce): (...args: any[]) => void => {
  let timeout: NodeJS.Timeout
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
  console.log(data, 'response from data')
  
  // Store the fetched data in the cache with the URL as the key
  cache[url] = data;
  
  // Return the fetched data
  return data;
};

const MapPage: React.FC = () => {

const [loading, setLoading] = useState(false);
const [error, setError] = useState<null | string>(null);
const {aircraftData, updateAircraftData } = useAircraftContext()
const [viewState, setViewState] = useState<any>({
  longitude: -100,
  latitude: 40,
  zoom: 3.5
});

const onMove = (evt: any) => {
  setViewState(evt.viewState)
  // console.log(viewState.latitude, viewState.longitude)
  console.log(aircraftData)
}

const fetchData = useCallback(() => {
  setLoading(true);
  fetchWithCache(apiUrl)
    .then((res: any) => {
      console.log(res)
      updateAircraftData(res);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err) 
      setError('Failed to fetch aircraft data')
    setLoading(false)})

}, [apiUrl, updateAircraftData]);





useEffect(() => {
  fetchData(); // Call immediately on page load

  // const interval = setInterval(() => {
  //   fetchData();
  // }, 20000); // Call every 6 seconds

  // return () => clearInterval(interval); // Clean up on unmount
}, [fetchData]);


const aircraftMarkers = useMemo(() => {
    // @ts-ignore
  return aircraftData?.states?.map((aircraft: any) => {
    const [
      icao24,
      callsign,
      origin_country,
      time_position,
      last_contact,
      longitude,
      latitude,
      baro_altitude,
      on_ground,
      velocity,
      true_track,
      vertical_rate,
      sensors,
      geo_altitude,
      squawk,
      spi,
      position_source,
      category
    ] = aircraft;

    if (typeof longitude === 'number' && typeof latitude === 'number') {
      return (
        <Marker
          longitude={longitude}
          latitude={latitude}
        >
          <img src={'src/assets/airplane-svgrepo-com.svg'} width='24' alt="airplane marker"/>
        </Marker>
      );
    }
    return null;
  }).filter(Boolean);
}, [aircraftData]);

return (
    <>
    <Box width="100vw" display="flex"
          height="100vh" justifyContent="center"
          alignItems="center">
    <Map 
    mapboxAccessToken={mapAccessToken}
    {...viewState}
    onMove={onMove}
  style={{width: '100vw', height: '80vh'}}
  mapStyle="mapbox://styles/mapbox/light-v11"
  maxPitch={0}
  minZoom={1}
  maxZoom={12}
    >
  
    {aircraftData?.states?.map((aircraft) => {

const [
  // icao24,
  // callsign,
  // origin_country,
  // time_position,
  // last_contact,
  longitude,
  latitude,
  // baro_altitude,
  // on_ground,
  // velocity,
  // true_track,
  // vertical_rate,
  // sensors,
  // geo_altitude,
  // squawk,
  // spi,
  // position_source,
  // category
] = aircraft;

if (typeof longitude === 'number' && typeof latitude === 'number') {
  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
    >
      {aircraftMarkers}
      <img src={'src/assets/airplane-svgrepo-com.svg'} width='12' />
    </Marker>
  );
} else { 
  return 
} null
      })}

      </Map>   
      </Box>
    </>
  )
}

export default MapPage
