// export interface AircraftState {
//   icao24: string;
//   callsign: string | null;
//   origin_country: string;
//   time_position: number | null;
//   last_contact: number;
//   longitude: number | null;
//   latitude: number | null;
//   baro_altitude: number | null;
//   on_ground: boolean;
//   velocity: number | null;
//   true_track: number | null;
//   vertical_rate: number | null;
//   sensors: number[] | null;
//   geo_altitude: number | null;
//   squawk: string | null;
//   spi: boolean;
//   position_source: number;
//   category: number;
// }

export type AircraftStateArray = [
  string,        // icao24
  string | null, // callsign
  string,        // origin_country
  number | null, // time_position
  number,        // last_contact
  number | null, // longitude
  number | null, // latitude
  number | null, // baro_altitude
  boolean,       // on_ground
  number | null, // velocity
  number | null, // true_track
  number | null, // vertical_rate
  number[] | null, // sensors
  number | null, // geo_altitude
  string | null, // squawk
  boolean,       // spi
  number,        // position_source
  number         // category
];
  
  export interface OSNAPIResponse {
    time: number,
    states: AircraftStateArray[][];
  }
  
  export interface AircraftContextProps {
    aircraftData: OSNAPIResponse
    updateAircraftData: (data: OSNAPIResponse) => void;
  }
  
  export interface AircraftProviderProps {
    children: React.ReactNode;
  }

  export interface IDebounce {
    func: Function,
    wait: number
  }
  
  export interface IViewState {
    longitude: number;
    latitude: number;
    zoom: number;
  }
  