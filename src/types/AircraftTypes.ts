export interface AircraftState {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  time_position: number | null;
  last_contact: number;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  on_ground: boolean;
  velocity: number | null;
  true_track: number | null;
  vertical_rate: number | null;
  sensors: number[] | null;
  geo_altitude: number | null;
  squawk: string | null;
  spi: boolean;
  position_source: number;
  category: number;
}
  
  export interface OSNAPIResponse {
    time: number,
    states: AircraftState[][];
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
  