import { useCallback, useEffect } from 'react';
import { Map, Marker } from 'react-map-gl';
import { useAircraftContext } from '../context/AircraftContext';
import { IDebounce, OSNAPIResponse } from '../types/AircraftTypes';

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

  const fetchData = useCallback(() => {
    fetchWithCache(apiUrl)
      .then((res: any) => {
        updateAircraftData(res);
        console.log('Aircraft Data Console Log', aircraftData);
      })
      .catch((err) => console.error(err));
  }, [apiUrl, updateAircraftData]);

  useEffect(() => {
    fetchData(); // Call immediately on page load

    // const interval = setInterval(() => {
    //   fetchData();
    // }, 6000); // Call every 6 seconds

    // return () => clearInterval(interval); // Clean up on unmount
  }, [fetchData]);

  return (
    <>
      <Map
        mapboxAccessToken={mapAccessToken}
        initialViewState={{
          longitude: -100.0,
          latitude: 45,
          zoom: 3,
        }}
        style={{ width: '100vh', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        maxPitch={0}
        minZoom={1}
        maxZoom={12}
      >
        {aircraftData?.states?.map((aircraft: any[], index: number) => {
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

          // Ensure longitude and latitude are numbers
          if (typeof longitude === 'number' && typeof latitude === 'number') {
            return (
              <Marker
                key={index}
                longitude={longitude}
                latitude={latitude}
              />
            );
          }

          return null;
        })}
      </Map>
    </>
  );
};

export default MapPage;